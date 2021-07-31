import React from 'react';
import {
    TableBody as MuiTableBody,
    TableCell,
    TableRow,
    Checkbox
} from '@material-ui/core';
import { getComparator, stableSort } from '../../../helpers/sortingFunctions';
import { IUser, Order } from '../../../types';
import { headCells } from './headerCells';

interface IProps {
    order: Order;
    orderBy: keyof IUser;
    users: IUser[];
    page: number;
    rowsPerPage: number;
    isSelected(id: number): boolean;
    handleClick(event: React.MouseEvent<unknown>, id: number): void;
    emptyRows: number;
}

const TableBody: React.FC<IProps> = ({
    page,
    rowsPerPage,
    users,
    order,
    orderBy,
    isSelected,
    handleClick,
    emptyRows
}: IProps) => {
    return (
        <MuiTableBody>
            {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId
                                    }}
                                />
                            </TableCell>
                            {headCells.map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {cell.id == 'active'
                                        ? row[cell.id]
                                            ? 'Yes'
                                            : 'No'
                                        : row[cell.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 53 * emptyRows
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </MuiTableBody>
    );
};

export default TableBody;
