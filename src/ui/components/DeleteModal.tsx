import React from 'react';
import { IUser } from '../../types';
import { deleteUser } from '../../redux/userSlice';
import { useAppDispatch } from '../../redux/hooks';

interface IProps {
    user: IUser;
    closeModal(): void;
}

const DeleteModal: React.FC<IProps> = ({ user, closeModal }: IProps) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>Are you sure you want to delete this user?</div>
            <div>{`${user?.first_name} ${user?.last_name}`}</div>
            <button onClick={() => dispatch(deleteUser(user.id))}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
        </div>
    );
};

export default DeleteModal;
