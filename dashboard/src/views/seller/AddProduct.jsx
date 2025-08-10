import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
        const categories = [
                {
                        id: 1,
                        name: "Sports",
                },
                {
                        id: 2,
                        name: "Electronics",
                },
                {
                        id: 3,
                        name: "Fashion",
                },
                {
                        id: 4,
                        name: "Computers",
                },
                {
                        id: 5,
                        name: "Books",
                },
                {
                        id: 6,
                        name: "Toys",
                },
                {
                        id: 7,
                        name: "Watch",
                },
        ];
        const [cateShow, setCateShow] = useState(false);
        const [allCategory, setAllCategory] = useState(categories);
        const [searchValue, setSearchValue] = useState("");
        const [category, setCategory] = useState(categories[0].name);

        const [state, setState] = useState({
                name: "",
                description: "",
                discount: "",
                price: "",
                brand: "",
                stock: "",
                category: "",
        });

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const categorySearch = (e) => {
                setSearchValue(e.target.value);
                setTimeout(() => {
                        const filteredCategory = categories.filter((cate) =>
                                cate.name.toLowerCase().includes(e.target.value.toLowerCase())
                        );
                        setAllCategory(filteredCategory);
                }, 1000);
        };

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* First Part: Add Product */}
                                <div className="flex justify-between items-center pb-4">
                                        <h1 className="text-[#d0d2d6] text-xl font-bold">Add Product</h1>
                                        <Link className="bg-blue-500 hover:shadow-blue-500 hover:shadow-sm hover:bg-blue-400/60 transition-all duration-300 text-white px-4 py-2 my-2 rounded-md">
                                                All Product
                                        </Link>
                                </div>

                                {/* Second Part: Add Product Form */}
                                <div>
                                        <form action="">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-[#d0d2d6]">
                                                        {/* pRoduct Name */}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="name">Product Name</label>
                                                                <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        placeholder="Product Name"
                                                                        value={state.name}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>

                                                        {/* Product  Brand */}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="brand">Product Brand</label>
                                                                <input
                                                                        type="text"
                                                                        id="brand"
                                                                        name="brand"
                                                                        placeholder="Brand Name"
                                                                        value={state.brand}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>

                                                        {/* Category*/}
                                                        <div className="flex flex-col w-full gap-1 relative">
                                                                <label htmlFor="category">Product Category</label>
                                                                <input
                                                                        readOnly
                                                                        onClick={() => setCateShow(!cateShow)}
                                                                        type="text"
                                                                        id="category"
                                                                        name="category"
                                                                        placeholder="Category"
                                                                        value={category}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                                {/* Select category */}
                                                                <div
                                                                        className={`absolute top-[101%] bg-slate-600 w-full transition-all p-2 ${
                                                                                cateShow ? "scale-100" : "scale-0"
                                                                        }`}
                                                                >
                                                                        <div className="w-full px-4 py-2 fixed">
                                                                                <input
                                                                                        className="px-3 py-1 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden w-full"
                                                                                        type="text"
                                                                                        placeholder="Search..."
                                                                                        value={searchValue}
                                                                                        onChange={categorySearch}
                                                                                />
                                                                        </div>

                                                                        {/* Select */}
                                                                        <div className="pt-14"></div>
                                                                        <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                                                                                {allCategory.map((cate, idx) => (
                                                                                        <span
                                                                                                onClick={() => {
                                                                                                        setCateShow(
                                                                                                                false
                                                                                                        );
                                                                                                        setCategory(
                                                                                                                cate.name
                                                                                                        );
                                                                                                        setSearchValue(
                                                                                                                ""
                                                                                                        );
                                                                                                        setAllCategory(
                                                                                                                categories
                                                                                                        );
                                                                                                }}
                                                                                                key={idx}
                                                                                        >
                                                                                                {cate.name}
                                                                                        </span>
                                                                                ))}
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* Stock*/}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="stock">Product Stock</label>
                                                                <input
                                                                        type="number"
                                                                        id="stock"
                                                                        name="stock"
                                                                        placeholder="Stock"
                                                                        value={state.stock}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default AddProduct;
