import { Color } from '@material-ui/lab';
import { SetStateAction } from 'react';

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    verified: boolean;
    middle_initial: null;
    created_at: string;
    district: number;
    districtName: string;
    active: boolean;
}

export interface IDistrict {
    id: number;
    name: string;
    city: string;
}

export interface IHeaderCell {
    id: string;
    label: string;
}

export interface IDirection {
    direction: 'desc' | 'asc' | undefined;
}

export type TSetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export interface IPopUp {
    setOpenPopup: TSetStateBoolean;
}

export interface IHeadCell {
    disablePadding: boolean;
    id: keyof IUser;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export type TNotify = {
    isOpen: boolean;
    message: string;
    type: Color;
};

export type TSetNotify = React.Dispatch<
    SetStateAction<{ isOpen: boolean; message: string; type: Color }>
>;
export type TSetConfirmDialog = React.Dispatch<
    React.SetStateAction<{
        isOpen: boolean;
        title: string;
        subTitle: string;
    }>
>;

export type TConfirmDialog = {
    isOpen: boolean;
    title: string;
    subTitle: string;
};

export type TSetStateNumArray = React.Dispatch<React.SetStateAction<number[]>>;
