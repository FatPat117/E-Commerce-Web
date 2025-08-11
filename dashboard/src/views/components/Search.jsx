import React from "react";

const Search = ({ setPerPage, perPage, setSearchValue, searchValue }) => {
        return (
                /* Select and Search field */
                <div className="flex justify-between items-center">
                        <select
                                onChange={(e) => setPerPage(parseInt(e.target.value))}
                                name=""
                                id=""
                                value={perPage}
                                className="px-4 py-2 focus:border-indigo-500 hover:border-indigo-500 outline-none bg-[#6a5fdf] border-2 border-slate-700 rounded-lg text-[#d0d2d6] overflow-hidden cursor-pointer"
                        >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                        </select>
                        <input
                                type="text"
                                placeholder="search"
                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                        />
                </div>
        );
};

export default Search;
