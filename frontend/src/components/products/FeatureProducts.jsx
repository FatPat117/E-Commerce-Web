import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import Rating from "../Rating";
const FeatureProducts = ({ products }) => {
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

        return (
                <div className="w-[85%] flex flex-wrap mx-auto">
                        <div className="w-full">
                                <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
                                        <h2>Feature Products</h2>
                                        <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
                                </div>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2  md-lg:grid-cols-4 gap-6 ">
                                {products?.map((product, idx) => {
                                        return (
                                                <div
                                                        key={idx}
                                                        className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
                                                >
                                                        {/* Product  Image */}
                                                        <div className="relative overflow-hidden">
                                                                {/* Discount part */}
                                                                {product?.discount && (
                                                                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                                                                                {product?.discount}%
                                                                        </div>
                                                                )}
                                                                <img
                                                                        src={product?.images[0]}
                                                                        alt="products"
                                                                        className="w-full h-[300px] md-lg:w-full "
                                                                />

                                                                <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                                                                        <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                                                                                <FaRegHeart />
                                                                        </li>
                                                                        <Link
                                                                                to="/product/details/newslug"
                                                                                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                        >
                                                                                <FaEye />
                                                                        </Link>
                                                                        <li
                                                                                onClick={() => addToCart(product?._id)}
                                                                                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                                                                        >
                                                                                <RiShoppingCartLine />
                                                                        </li>
                                                                </ul>
                                                        </div>

                                                        {/* Product Details*/}
                                                        <div className="py-3 text-slate-600 px-2">
                                                                <h2 className="font-bold text-lg">{product?.name}</h2>
                                                                <div className="flex justify-start items-center gap-3">
                                                                        <span className="text-md font-semibold">
                                                                                {product?.price}
                                                                        </span>
                                                                        <div className="flex">
                                                                                <Rating
                                                                                        ratings={product?.rating}
                                                                                ></Rating>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        );
                                })}
                        </div>
                </div>
        );
};

export default FeatureProducts;
