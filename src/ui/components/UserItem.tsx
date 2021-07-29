import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import getDistrict from "../../services/getDistrict";
import { IUser } from "../../types";
import DeleteModal from "./DeleteModal";

interface IProps {
    user: IUser;
}

const UserItem: React.FC<IProps> = ({ user }: IProps) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [district, setDistrict] = useState("");

    const handleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    useEffect(() => {
        getDistrict(user.district).then((data) => setDistrict(data[0].name));
    }, [user.id]);

    return (
        <div>
            <li
                style={{
                    marginBottom: "2rem",
                    background: "#fff",
                    border: "1px solid black",
                    padding: "1rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        textAlign: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    <div style={{ width: "5%" }}>{user.id}</div>
                    <div style={{ width: "20%" }}>{user.last_name}</div>
                    <div style={{ width: "20%" }}>{user.first_name}</div>
                    <div style={{ width: "5%" }}>{user.middle_initial}</div>
                    <div style={{ width: "20%" }}>{district}</div>
                    <div style={{ width: "10%" }}>
                        {user.verified ? "Yes" : "No"}
                    </div>
                    <div style={{ width: "20%" }}>{user.created_at}</div>
                </div>
                <div
                    style={{
                        marginLeft: "auto",
                        width: "10rem",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "2rem",
                    }}
                >
                    <button type="button">Edit</button>
                    <button type="button" onClick={() => handleDeleteModal()}>
                        Delete
                    </button>
                </div>
            </li>
            {deleteModal && (
                <DeleteModal
                    user={user}
                    closeModal={handleDeleteModal}
                ></DeleteModal>
            )}
        </div>
    );
};

export default UserItem;
