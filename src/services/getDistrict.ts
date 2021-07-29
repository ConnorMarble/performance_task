import { IDistrict } from "./../types";
import axios from "axios";

const getDistrict = (id: number): Promise<IDistrict[]> => {
    return axios
        .get<IDistrict[]>("districts.json")
        .then((res) => res.data.filter((district) => district.id === id));
};

export default getDistrict;
