import { IUser } from '../types';

const getUser = (id: number, arr: IUser[]): IUser => {
    const user = arr.find((u) => u.id == id);
    if (user == undefined) {
        return {} as IUser;
    }
    return user;
};

export default getUser;
