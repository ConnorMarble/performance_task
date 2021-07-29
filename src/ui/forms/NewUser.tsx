import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addUser } from "../../redux/userSlice";
import { IUser } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../validation/yup.schema";

//////////WHEN I ADD NEW USER TO FILTER LAST PAGE IT DOESNT SHOW UP

const NewUserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const districtState = useAppSelector((state) => state.districts.districts);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data: IUser) => {
        dispatch(addUser(data));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="first name" {...register("first_name")} />
            <input
                placeholder="middle initial"
                {...register("middle_initial")}
            />
            <input placeholder="last name" {...register("last_name")} />
            <input placeholder="email" {...register("email")} />
            <input type="checkbox" {...register("active")} />
            <select {...register("district")}>
                {districtState.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
};

export default NewUserForm;
