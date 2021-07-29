import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    filterActiveUsers,
    filterDistrict,
    setDistrict,
    setIsFiltered,
} from "../../redux/userSlice";

const Filter: React.FC = () => {
    const [activeToggle, setActiveToggle] = useState(false);
    const userDistrict = useAppSelector((state) => state.users.district);
    const dispatch = useAppDispatch();

    useEffect(() => {
        userDistrict && dispatch(filterDistrict());
        activeToggle && dispatch(filterActiveUsers());
        if (activeToggle || userDistrict || (activeToggle && userDistrict)) {
            dispatch(setIsFiltered(true));
        } else {
            dispatch(setIsFiltered(false));
        }
    }, [userDistrict, activeToggle]);

    return (
        <div>
            <label htmlFor="district">Filter by District: </label>
            <select
                name="district"
                onChange={(e) => dispatch(setDistrict(Number(e.target.value)))}
            >
                <option value={1}>District One</option>
                <option value={2}>District Two</option>
            </select>
            <br />
            <label htmlFor="activeUsers">Active Users Only: </label>
            <input
                type="checkbox"
                name="activeUsers"
                checked={activeToggle}
                onChange={() => setActiveToggle(!activeToggle)}
            />
        </div>
    );
};

export default Filter;
