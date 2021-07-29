import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setUsers } from "../../redux/userSlice";
import getUsers from "../../services/getUsers";
import getDistricts from "../../services/getAllDistricts";
import { setDistricts } from "../../redux/districtSlice";
import NewUserForm from "../forms/NewUser";
import Pagination from "./Pagination";

const UserTable: React.FC = () => {
    const userState = useAppSelector((state) => state.users.users);
    const userFiltered = useAppSelector((state) => state.users.filtered);
    const dispatch = useAppDispatch();
    const [addUserModal, setAddUserModal] = useState(false);

    const handleEditUser = () => {
        console.log("");
    };

    useEffect(() => {
        getUsers().then((users) => dispatch(setUsers(users)));
        getDistricts().then((districts) => dispatch(setDistricts(districts)));
    }, []);

    return (
        <div className="admin-user-table" style={{ marginTop: "7rem" }}>
            <Filter />
            <button onClick={() => setAddUserModal(!addUserModal)}>
                Add User
            </button>
            {addUserModal && <NewUserForm></NewUserForm>}
            <div
                style={{
                    border: "1px solid black",
                    width: "50rem",
                    marginTop: "2rem",
                }}
            >
                <h2
                    style={{ textAlign: "center", textDecoration: "underline" }}
                >
                    Users
                </h2>
                <ul
                    style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        height: "30rem",
                    }}
                >
                    <li
                        style={{
                            fontWeight: 700,
                            borderBottom: "2px solid black",
                            marginBottom: "1rem",
                            padding: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ width: "5%" }}>ID</div>
                            <div style={{ width: "20%" }}>Last Name</div>
                            <div style={{ width: "20%" }}>First Name</div>
                            <div style={{ width: "5%" }}>M.I.</div>
                            <div style={{ width: "20%" }}>District</div>
                            <div style={{ width: "10%" }}>Verified</div>
                            <div style={{ width: "20%" }}>Created</div>
                        </div>
                    </li>
                    {/* {userState.map((user) => (
                        <UserItem key={user.id} user={user}></UserItem>
                    ))} */}
                    <Pagination
                        users={userState}
                        pageLimit={5}
                        dataLimit={10}
                        filteredUsers={userFiltered}
                    />
                </ul>
            </div>
        </div>
    );
};

export default UserTable;
