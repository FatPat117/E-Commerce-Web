import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader, PropagateLoader } from "react-spinners";
import {
        change_password,
        get_user_info,
        messageClear,
        profile_image_upload,
        profile_info_update,
} from "../../store/Reducers/authReducer";
import { create_stripe_connect_account } from "../../store/Reducers/sellerReducer";
import { overrideStyle } from "../../utils/utils";
const Profile = () => {
        const dispatch = useDispatch();
        const { userInfo, successMessage, errorMessage, loader } = useSelector((state) => state.auth);

        const [state, setState] = useState({
                division: "",
                district: "",
                sub_district: "",
                shopName: "",
        });
        const [hideOldPassword, setHideOldPassword] = useState(true);
        const [hideNewPassword, setHideNewPassword] = useState(true);

        const toggleOldPassword = () => {
                setHideOldPassword(!hideOldPassword);
        };

        const toggleNewPassword = () => {
                setHideNewPassword(!hideNewPassword);
        };

        const AddImage = (e) => {
                if (e.target.files.length > 0) {
                        const formData = new FormData();
                        formData.append("image", e.target.files[0]);
                        dispatch(profile_image_upload(formData)).then(() => {
                                dispatch(get_user_info()); // gọi lại API lấy thông tin user mới
                        });
                }
        };

        const inputHandle = (e) => {
                setState({ ...state, [e.target.name]: e.target.value });
        };

        const UpdateProfile = (e) => {
                e.preventDefault();
                dispatch(profile_info_update(state));
        };

        const createStripeConnectAccount = () => {
                dispatch(create_stripe_connect_account());
        };

        const [passwordData, setPasswordData] = useState({
                email: "",
                oldPassword: "",
                newPassword: "",
        });

        const handleChangePassword = (e) => {
                e.preventDefault();
                dispatch(change_password(passwordData));
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
                <div className="px-2 lg:px-7 pt-5">
                        <div className="w-full flex flex-wrap">
                                {/* Left Side */}
                                <div className="w-full md:w-6/12">
                                        <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
                                                <div className="flex justify-center items-center py-3">
                                                        {userInfo?.image ? (
                                                                <label
                                                                        htmlFor="img"
                                                                        className="h-[200px] w-[250px] relative p-3 cursor-pointer overflow-hidden"
                                                                >
                                                                        <img src={userInfo.image} alt="avatar" />
                                                                        {loader && (
                                                                                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                                                        <span>
                                                                                                <FadeLoader />
                                                                                        </span>
                                                                                </div>
                                                                        )}
                                                                </label>
                                                        ) : (
                                                                <label
                                                                        className="flex justify-center items-center flex-col h-[200px] w-[250px] cursor-pointer border border-dashed hover:border-red-500 border-white relative gap-y-1"
                                                                        htmlFor="img"
                                                                >
                                                                        <span>
                                                                                <FaImage />
                                                                        </span>
                                                                        <span>Select Image</span>
                                                                        {loader && (
                                                                                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                                                        <span>
                                                                                                <FadeLoader />
                                                                                        </span>
                                                                                </div>
                                                                        )}
                                                                </label>
                                                        )}
                                                        <input
                                                                type="file"
                                                                className="hidden"
                                                                id="img"
                                                                onChange={AddImage}
                                                        />
                                                </div>

                                                {/* User profile */}
                                                <div className="px-0 md:px-5 py-2">
                                                        <div className="flex justify-between text-sm md:text-md flex-col gap-3 px-4 py-3 bg-slate-700 rounded-md relative">
                                                                <span className="self-end p-[6px] bg-yellow-600 rounded-md hover:shadow-md hover:shadow-yellow-600/50 cursor-pointer absolute top-2 right-2">
                                                                        <FaEdit />
                                                                </span>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Name:{" "}
                                                                        </span>
                                                                        <span>{userInfo?.name}</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Email:{" "}
                                                                        </span>
                                                                        <span>{userInfo?.email}</span>
                                                                </div>
                                                                <div className="flex gap-2 capitalize">
                                                                        <span className="font-bold text-md">
                                                                                Role:{" "}
                                                                        </span>
                                                                        <span>{userInfo.role}</span>
                                                                </div>
                                                                <div className="flex gap-2 capitalize">
                                                                        <span className="font-bold text-md">
                                                                                Status:{" "}
                                                                        </span>
                                                                        <span>{userInfo.status}</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        <span className="font-bold text-md">
                                                                                Payment Account:{" "}
                                                                        </span>
                                                                        <p>
                                                                                {userInfo.payment === "active" ? (
                                                                                        <span className="bg-green-500 text-white px-2 py-1 rounded-lg font-normal ml-2 capitalize">
                                                                                                {userInfo.payment}
                                                                                        </span>
                                                                                ) : (
                                                                                        <span
                                                                                                onClick={
                                                                                                        createStripeConnectAccount
                                                                                                }
                                                                                                className="bg-red-500 text-white px-2 py-1 rounded-lg cursor-pointer"
                                                                                        >
                                                                                                Click to active
                                                                                        </span>
                                                                                )}
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Edit Form */}
                                                <div className="px-0 md:px-5 py-2">
                                                        {!userInfo.shopInfo ? (
                                                                <form onSubmit={UpdateProfile}>
                                                                        {/* Shop Name */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="shopName">
                                                                                        Shop Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="shopName"
                                                                                        name="shopName"
                                                                                        placeholder="Shop Name"
                                                                                        value={state.shopName}
                                                                                        onChange={inputHandle}
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* Division Name */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="division">
                                                                                        Division Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="division"
                                                                                        name="division"
                                                                                        placeholder="Division Name"
                                                                                        value={state.division}
                                                                                        onChange={inputHandle}
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* District */}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="district">
                                                                                        District Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="district"
                                                                                        name="district"
                                                                                        placeholder="District Name"
                                                                                        value={state.district}
                                                                                        onChange={inputHandle}
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* Sub District*/}
                                                                        <div className="flex flex-col w-full gap-1 mb-2">
                                                                                <label htmlFor="subdis">
                                                                                        Sub District Name
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="subdis"
                                                                                        name="sub_district"
                                                                                        placeholder="Sub District Name"
                                                                                        value={state.sub_district}
                                                                                        onChange={inputHandle}
                                                                                        className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                                />
                                                                        </div>

                                                                        {/* button */}
                                                                        <div className="flex mt-4">
                                                                                <button
                                                                                        type="submit"
                                                                                        className=" h-[40px] bg-red-600  w-full cursor-pointer hover:bg-red-600/50 hover:shadow-red-600 hover:shadow-md text-white py-2 px-7 mb-1 rounded-md "
                                                                                        disabled={loader}
                                                                                >
                                                                                        {loader ? (
                                                                                                <PropagateLoader
                                                                                                        color="#fff"
                                                                                                        cssOverride={
                                                                                                                overrideStyle
                                                                                                        }
                                                                                                />
                                                                                        ) : (
                                                                                                "Update Profile"
                                                                                        )}
                                                                                </button>
                                                                        </div>
                                                                </form>
                                                        ) : (
                                                                <div className="flex justify-between text-sm md:text-md flex-col gap-3 px-4 py-3 bg-slate-700 rounded-md relative">
                                                                        <span className="self-end p-[6px] bg-yellow-600 rounded-md hover:shadow-md hover:shadow-yellow-600/50 cursor-pointer absolute top-2 right-2">
                                                                                <FaEdit />
                                                                        </span>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Shop Name:{" "}
                                                                                </span>
                                                                                <span>
                                                                                        {userInfo.shopInfo?.shopName}
                                                                                </span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Division Name:{" "}
                                                                                </span>
                                                                                <span>
                                                                                        {userInfo.shopInfo?.division}
                                                                                </span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        District Name:{" "}
                                                                                </span>
                                                                                <span>
                                                                                        {userInfo.shopInfo?.district}
                                                                                </span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <span className="font-bold text-md">
                                                                                        Sub District Name:{" "}
                                                                                </span>
                                                                                <span>
                                                                                        {
                                                                                                userInfo.shopInfo
                                                                                                        ?.sub_district
                                                                                        }
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                        )}
                                                </div>
                                        </div>
                                </div>

                                {/* Right Side : Change Password*/}
                                <div className="w-full md:w-6/12">
                                        <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0 ">
                                                <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
                                                        <h2 className="text-[#d0d2d6] text-xl font-semibold mb-3">
                                                                Change Password
                                                        </h2>

                                                        <form onSubmit={handleChangePassword}>
                                                                {/* Email*/}
                                                                <div className="flex flex-col w-full gap-1 mb-2">
                                                                        <label htmlFor="email">Email</label>
                                                                        <input
                                                                                type="email"
                                                                                id="email"
                                                                                name="email"
                                                                                placeholder="Email"
                                                                                value={passwordData.email}
                                                                                onChange={(e) =>
                                                                                        setPasswordData({
                                                                                                ...passwordData,
                                                                                                email: e.target.value,
                                                                                        })
                                                                                }
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                </div>

                                                                {/*Old Password */}
                                                                <div className="flex flex-col w-full gap-1 mb-2 relative">
                                                                        <label htmlFor="o_password">Old Password</label>
                                                                        <input
                                                                                type={
                                                                                        hideOldPassword
                                                                                                ? "password"
                                                                                                : "text"
                                                                                }
                                                                                id="o_password"
                                                                                name="old_password"
                                                                                value={passwordData.oldPassword}
                                                                                onChange={(e) =>
                                                                                        setPasswordData({
                                                                                                ...passwordData,
                                                                                                oldPassword:
                                                                                                        e.target.value,
                                                                                        })
                                                                                }
                                                                                placeholder="Old Password"
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                        <span
                                                                                onClick={toggleOldPassword}
                                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                                        >
                                                                                {hideOldPassword ? (
                                                                                        <FaEye />
                                                                                ) : (
                                                                                        <FaEyeSlash />
                                                                                )}
                                                                        </span>
                                                                </div>

                                                                {/*New Password */}
                                                                <div className="flex flex-col w-full gap-1 mb-2 relative">
                                                                        <label htmlFor="n_password">New Password</label>
                                                                        <input
                                                                                type={
                                                                                        hideNewPassword
                                                                                                ? "password"
                                                                                                : "text"
                                                                                }
                                                                                id="n_password"
                                                                                name="new_password"
                                                                                placeholder="New Password"
                                                                                value={passwordData.newPassword}
                                                                                onChange={(e) =>
                                                                                        setPasswordData({
                                                                                                ...passwordData,
                                                                                                newPassword:
                                                                                                        e.target.value,
                                                                                        })
                                                                                }
                                                                                className="px-4 py-2 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/50 border-slate-900 border-2 rounded-md text-[#d0d2d6] overflow-hidden outline-none"
                                                                        />
                                                                        <span
                                                                                onClick={toggleNewPassword}
                                                                                className="absolute top-[50%] right-[3px] translate-x-[-50%] translate-y-[40%] cursor-pointer"
                                                                        >
                                                                                {hideNewPassword ? (
                                                                                        <FaEye />
                                                                                ) : (
                                                                                        <FaEyeSlash />
                                                                                )}
                                                                        </span>
                                                                </div>

                                                                {/* button */}
                                                                <div className="flex">
                                                                        <div className=" text-center rounded-lg px-7 py-3 mt-2 bg-red-500  hover:shadow-red-500/50 hover:shadow-md hover:bg-red-400 transition-colors duration-300 text-white cursor-pointer ">
                                                                                <button
                                                                                        disabled={loader}
                                                                                        className="cursor-pointer"
                                                                                >
                                                                                        {loader
                                                                                                ? "Loading..."
                                                                                                : "Save changes"}
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Profile;
