import React, { useState } from "react";
import Search from "../components/Search";

const Products = () => {
        const [perPage, setPerPage] = useState(5);
        const [searchValue, setSearchValue] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        return (
                <div className="px-2 lg:px-7 pt-5">
                        <h1 className="text-[#000000] text-xl font-bold">All Products</h1>
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* Search and Select form */}
                                <Search setPerPage={setPerPage} perPage={perPage} />
                        </div>
                </div>
        );
};

export default Products;
