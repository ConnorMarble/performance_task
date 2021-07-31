import { IDistrict } from '../types';
import axios from 'axios';

const getDistrict = async (id: number): Promise<string | undefined> => {
    const response = await axios.get<IDistrict[]>('districts.json');
    return response.data.find((district) => district.id === id)?.name;
};

export default getDistrict;
