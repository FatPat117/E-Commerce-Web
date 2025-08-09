import React from "react";

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, showItem }) => {
        let totalPage = Math.ceil(totalItem / perPage); //Calculate total page
        let startPage = pageNumber;
        let dif = totalPage - pageNumber;

        if (dif < showItem) {
                startPage = totalPage - showItem;
        }

        let endPage = startPage < 0 ? showItem : showItem + startPage;

        if (startPage <= 0) {
                startPage = 1;
        }

        const createButton = () => {};

        return <div>Pagination</div>;
};

export default Pagination;
