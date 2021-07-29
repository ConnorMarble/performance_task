import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../types";
import UserItem from "./UserItem";

interface IProps {
    users: IUser[];
    filteredUsers: IUser[];
    pageLimit: number;
    dataLimit: number;
}

const Pagination: React.FC<IProps> = ({
    users,
    filteredUsers,
    pageLimit,
    dataLimit,
}: IProps) => {
    const isFiltered = useAppSelector((state) => state.users.isFiltered);
    const [pages] = useState(Math.round(users.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event: React.MouseEvent<HTMLElement>) {
        const input = (event.target as HTMLInputElement).textContent;
        const pageNumber = Number(input);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        if (isFiltered) {
            return filteredUsers.slice(startIndex, endIndex);
        }
        return users.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit)
            .fill({ start })
            .map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className="dataContainer">
                {getPaginatedData().map((d, idx) => (
                    <UserItem key={idx} user={d} />
                ))}
            </div>
            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${
                            currentPage === item ? "active" : null
                        }`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${
                        currentPage === pages ? "disabled" : ""
                    }`}
                >
                    next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
