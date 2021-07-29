import { IDistrict } from "./../types";
import axios from "axios";

const getDistricts = (): Promise<IDistrict[]> => {
    return axios
        .get<IDistrict[]>("districts.json")
        .then((res): IDistrict[] => res.data);
};
export default getDistricts;
