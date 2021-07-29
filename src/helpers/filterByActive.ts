import { IUser } from "./../types";

const filterByActive = (arr: IUser[]): IUser[] => {
    return arr.filter((user) => user.active === true);
};

export default filterByActive;
