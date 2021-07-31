import axios from 'axios';
import { IUser } from '../types';
import getDistricts from './getDistricts';

const getUsers = async (): Promise<IUser[]> => {
    const users = await axios
        .get<IUser[]>('users.json')
        .then((res): IUser[] => res.data);

    const districts = await getDistricts();

    const newArr = users.map((user) => {
        return {
            ...user,
            districtName: districts[user.district - 1].name
        };
    });

    return newArr;
};

export default getUsers;
