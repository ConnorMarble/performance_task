import axios from "axios";
import { IUser } from "../types";

const getUsers = (): Promise<IUser[]> => {
    return axios.get<IUser[]>("users.json").then((res): IUser[] => res.data);
};
export default getUsers;
