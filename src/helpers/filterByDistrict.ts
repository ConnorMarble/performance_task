import { IUser } from "./../types";

const filterByDistrict = (arr: IUser[], district: number): IUser[] => {
    return arr.filter((user) => user.district == district);
};

export default filterByDistrict;
