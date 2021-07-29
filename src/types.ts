export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    verified: boolean;
    middle_initial?: null;
    created_at: string;
    district: number;
    active: boolean;
}

export interface IDistrict {
    id: number;
    name: string;
    city: string;
}
