import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { add_to_cart, add_to_wishlist, messageClear } from "../../store/reducers/cartReducer";
import Rating from "../Rating";
const ShopProduct = ({ style, products }) => {
        const { userInfo } = useSelector((state) => state.auth);
        const { successMessage, errorMessage } = useSelector((state) => state.cart);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const addToCart = (productId) => {
                if (userInfo) {
                        dispatch(
                                add_to_cart({
                                        userId: userInfo.id,
                                        productId: productId,
                                        quantity: 1,
                                })
                        );
                } else {
                        navigate("/login");
                }
        };

        useEffect(() => {
                if (successMessage) {
                        toast.success(successMessage);
                        dispatch(messageClear());
                }
                if (errorMessage) {
                        toast.error(errorMessage);
                        dispatch(messageClear());
                }
        }, [successMessage, errorMessage]);

        const addToWishList = (product) => {
                dispatch(
                        add_to_wishlist({
                                userId: userInfo.id,
                                productId: product._id,
                                name: product?.name,
                                price: product?.price,
                                image: product?.images[0],
                                discount: product?.discount,
                                rating: product?.rating,
                                slug: product?.slug,
                        })
                );
        };
        return (
                <div
                        className={`w-full grid ${
                                style == "grid" ? "grid-cols-2 md-lg:grid-cols-3 " : "grid-cols-2  "
                        } gap-3`}
                >
                        {products?.map((data, idx) => {
                                return (
                                        <div
                                                key={idx}
                                                className={`flex transition-all duration-600 hover:shadow-md hover:-translate-y-3  ${
                                                        style === "grid"
                                                                ? "flex-col justify-start item-start"
                                                                : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
                                                }w-full gap-4 bg-white p-1 rounded-md`}
                                        >
                                                {/* Images */}
                                                <div
                                                        className={`${
                                                                style === "grid"
                                                                        ? "w-full relative group h-[170px] sm:h-[270px] md:h-[270px] overflow-hidden"
                                                                        : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
                                                        }`}
                                                >
                                                        <img
                                                                src={data?.images[0]}
                                                                alt=""
                                                                className="w-full  h-[170px] md:h-[240px] rounded-md md-lg:h-[270px] object-contain"
                                                        />

                                                        <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                                                                <li
                                                                        onClick={() => addToWishList(data)}
                                                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                >
                                                                        <FaRegHeart />
                                                                </li>
                                                                <Link
                                                                        to={`/product/details/${data?.slug}`}
                                                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                >
                                                                        <FaEye />
                                                                </Link>
                                                                <li
                                                                        onClick={() => addToCart(data?._id)}
                                                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                >
                                                                        <RiShoppingCartLine />
                                                                </li>
                                                        </ul>
                                                </div>

                                                {/* Product Details*/}
                                                <div className="flex flex-col justify-start items-start gap-1">
                                                        <h2 className="font-bold text-lg">{data?.name}</h2>
                                                        <div className="flex justify-start items-center gap-3">
                                                                <span className="text-md font-semibold">
                                                                        ${data?.price}
                                                                </span>
                                                                <div className="flex">
                                                                        <Rating ratings={data?.rating}></Rating>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                );
                        })}
                </div>
        );
};

export default ShopProduct;
