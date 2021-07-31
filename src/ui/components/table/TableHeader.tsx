import {
    createStyles,
    makeStyles,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme
} from '@material-ui/core';
import React from 'react';
import {
    IHeadCell,
    IUser,
    TChaneEvent,
    TMouseEventUnkown
} from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '90%'
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        table: {
            minWidth: 750,
            maxHeight: '800px'
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        }
    })
);

type Order = 'asc' | 'desc';

interface IProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: TMouseEventUnkown, property: keyof IUser) => void;
    onSelectAllClick: TChaneEvent;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: IHeadCell[];
}

const TableHeader: React.FC<IProps> = (props: IProps) => {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells
    } = props;
    const createSortHandler =
        (property: keyof IUser) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
