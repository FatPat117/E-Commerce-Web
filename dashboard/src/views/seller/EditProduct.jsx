import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_category } from "../../store/Reducers/categoryReducer";
import { get_product } from "../../store/Reducers/productReducer";

const EditProduct = () => {
        const { productId } = useParams();
        const dispatch = useDispatch();
        const { categories } = useSelector((state) => state.category);
        const { product } = useSelector((state) => state.product);
        const [cateShow, setCateShow] = useState(false);
        const [allCategory, setAllCategory] = useState([]);
        const [searchValue, setSearchValue] = useState("");
        const [category, setCategory] = useState("");
        const [images, setImages] = useState([]);
        const [imageShow, setImageShow] = useState([]);

        const [state, setState] = useState({
                name: "",
                description: "",
                discount: 0,
                price: 0,
                brand: "",
                stock: 0,
                category: "",
        });

        useEffect(() => {
                dispatch(get_category({ searchValue: "", page: "", perPage: "" }));
                dispatch(get_product(productId));
        }, [dispatch, productId]);

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const changeImage = (img, files) => {
                if (files.length > 0) {
                        console.log(img, files);
                }
        };

        const categorySearch = (e) => {
                const value = e.target.value;
                setSearchValue(value);

                if (value.length > 0) {
                        setTimeout(() => {
                                const filteredCategory = categories.filter((cate) =>
                                        cate.name.toLowerCase().includes(value.toLowerCase())
                                );
                                setAllCategory(filteredCategory);
                        }, 1000);
                }
        };

        useEffect(() => {
                setState({
                        name: product?.name,
                        description: product?.description,
                        discount: product?.discount,
                        price: product?.price,
                        brand: product?.brand,
                        stock: product?.stock,
                        category: product?.category,
                });
                setAllCategory(categories);
                setCategory(categories[0]?.name);
                setImageShow(product?.images);
        }, [categories, product]);

        return (
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                                {/* First Part: Add Product */}
                                <div className="flex justify-between items-center pb-4">
                                        <h1 className="text-[#d0d2d6] text-xl font-bold">Edit Product</h1>
                                        <Link
                                                to="/seller/dashboard/products"
                                                className="bg-blue-500 hover:shadow-blue-500 hover:shadow-sm hover:bg-blue-400/60 transition-all duration-300 text-white px-4 py-2 my-2 rounded-md"
                                        >
                                                All Product
                                        </Link>
                                </div>

                                {/* Second Part: Add Product Form */}
                                <div>
                                        <form action="" onSubmit={EditProduct}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-[#d0d2d6]">
                                                        {/* Product Name */}
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
                                                                        placeholder="Select Category"
                                                                        value={category}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                                {/* Select category */}
                                                                <div
                                                                        className={`absolute top-[101%] bg-slate-600 w-full transition-all p-1 ${
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
                                                                                {allCategory?.map((cate, idx) => (
                                                                                        <span
                                                                                                onClick={() => {
                                                                                                        setCateShow(
                                                                                                                false
                                                                                                        );
                                                                                                        setCategory(
                                                                                                                cate?.name
                                                                                                        );
                                                                                                        setSearchValue(
                                                                                                                ""
                                                                                                        );
                                                                                                        setAllCategory(
                                                                                                                categories
                                                                                                        );
                                                                                                }}
                                                                                                className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-md w-full cursor-pointer transition-all duration-300 ${
                                                                                                        category ==
                                                                                                        cate?.name
                                                                                                                ? "bg-indigo-500 text-white"
                                                                                                                : ""
                                                                                                }`}
                                                                                                key={idx}
                                                                                        >
                                                                                                {cate?.name}
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

                                                        {/* Price */}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="price">Product Price</label>
                                                                <input
                                                                        type="number"
                                                                        id="price"
                                                                        name="price"
                                                                        placeholder="Price"
                                                                        value={state.price}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>

                                                        {/* Discount*/}
                                                        <div className="flex flex-col w-full gap-1">
                                                                <label htmlFor="discount">Product Discount</label>
                                                                <input
                                                                        type="number"
                                                                        id="discount"
                                                                        name="discount"
                                                                        placeholder="Discount"
                                                                        value={state.discount}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                />
                                                        </div>

                                                        {/* Description*/}
                                                        <div className="flex flex-col w-full gap-1 col-span-2 ">
                                                                <label htmlFor="description">Product Description</label>
                                                                <textarea
                                                                        cols={5}
                                                                        rows={5}
                                                                        id="description"
                                                                        name="description"
                                                                        placeholder="Description"
                                                                        value={state.description}
                                                                        onChange={inputHandle}
                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                ></textarea>
                                                        </div>

                                                        {/* Image upload */}
                                                        <div className="grid col-span-2 lg:grid-cols-4 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 sm:gap-4 gap-3 w-full text-[#d0d2d6] mb-4 mt-4">
                                                                {imageShow?.map((img, idx) => {
                                                                        return (
                                                                                <div>
                                                                                        <label htmlFor={idx}>
                                                                                                <img
                                                                                                        src={img}
                                                                                                        alt="image"
                                                                                                        className="w-[360px] h-[360px] object-cover rounded-md cursor-pointer"
                                                                                                />
                                                                                        </label>
                                                                                        <input
                                                                                                onChange={(e) =>
                                                                                                        changeImage(
                                                                                                                img,
                                                                                                                e.target
                                                                                                                        .files
                                                                                                        )
                                                                                                }
                                                                                                type="file"
                                                                                                id={idx}
                                                                                                className="hidden"
                                                                                        />
                                                                                </div>
                                                                        );
                                                                })}
                                                        </div>
                                                </div>

                                                {/* button */}
                                                <div className="flex">
                                                        <div className=" text-center rounded-lg px-7 py-3 mt-2 bg-red-500  hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                <button className="cursor-pointer">Save changes</button>
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default EditProduct;
