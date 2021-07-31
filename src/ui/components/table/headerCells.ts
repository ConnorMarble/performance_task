import { IHeadCell } from "./../../../types";
export const headCells: IHeadCell[] = [
    { id: "id", label: "ID", numeric: true, disablePadding: false },
    {
        id: "first_name",
        label: "First Name",
        numeric: false,
        disablePadding: false,
    },
    {
        id: "middle_initial",
        label: "M.I.",
        numeric: false,
        disablePadding: false,
    },
    {
        id: "last_name",
        label: "Last Name",
        numeric: false,
        disablePadding: false,
    },
    // { id: "email", label: "Email", numeric: false, disablePadding: false },
    {
        id: "districtName",
        label: "District",
        numeric: true,
        disablePadding: false,
    },
    // {
    //     id: "verified",
    //     label: "Verified",
    //     numeric: false,
    //     disablePadding: false,
    // },
    { id: "active", label: "Active", numeric: false, disablePadding: false },
    {
        id: "created_at",
        label: "Created",
        numeric: false,
        disablePadding: false,
    },
];
