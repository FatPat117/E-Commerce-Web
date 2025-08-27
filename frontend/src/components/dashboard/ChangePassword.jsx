import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
        const [hideOldPassword, setHideOldPassword] = useState(true);
        const [hideNewPassword, setHideNewPassword] = useState(true);
        const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

        return (
                <div className="p-4 bg-white">
                        <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>

                        <form>
                                {/* Old Password */}
                                <div className="flex flex-col gap-1 mb-2 relative">
                                        <label htmlFor="old_password">Old Password</label>
                                        <input
                                                type={hideOldPassword ? "password" : "text"}
                                                name="old_password"
                                                id="old_password"
                                                placeholder="Enter your old password"
                                                className="outline-none px-3 py-2 border rounded-md text-slate-600 border-slate-200 focus:border-slate-600"
                                        />
                                        <span className="text-sm text-slate-600 absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer">
                                                {hideOldPassword ? (
                                                        <FaEyeSlash
                                                                onClick={() => setHideOldPassword(!hideOldPassword)}
                                                        />
                                                ) : (
                                                        <FaEye onClick={() => setHideOldPassword(!hideOldPassword)} />
                                                )}
                                        </span>
                                </div>

                                {/* New Password */}
                                <div className="flex flex-col gap-1 mb-2 relative">
                                        <label htmlFor="new_password">New Password</label>
                                        <input
                                                type={hideNewPassword ? "password" : "text"}
                                                name="new_password"
                                                id="new_password"
                                                placeholder="Enter your new password"
                                                className="outline-none px-3 py-2 border rounded-md text-slate-600 border-slate-200 focus:border-slate-600"
                                        />
                                        <span className="text-sm text-slate-600 absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer">
                                                {hideNewPassword ? (
                                                        <FaEyeSlash
                                                                onClick={() => setHideNewPassword(!hideNewPassword)}
                                                        />
                                                ) : (
                                                        <FaEye onClick={() => setHideNewPassword(!hideNewPassword)} />
                                                )}
                                        </span>
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1 mb-2 relative">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input
                                                type={hideConfirmPassword ? "password" : "text"}
                                                name="confirm_password"
                                                id="confirm_password"
                                                placeholder="Enter your confirm password"
                                                className="outline-none px-3 py-2 border rounded-md text-slate-600 border-slate-200 focus:border-slate-600"
                                        />
                                        <span className="text-sm text-slate-600 absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer">
                                                {hideConfirmPassword ? (
                                                        <FaEyeSlash
                                                                onClick={() =>
                                                                        setHideConfirmPassword(!hideConfirmPassword)
                                                                }
                                                        />
                                                ) : (
                                                        <FaEye
                                                                onClick={() =>
                                                                        setHideConfirmPassword(!hideConfirmPassword)
                                                                }
                                                        />
                                                )}
                                        </span>
                                </div>
                                <div>
                                        <button className=" mt-4 px-8 py-2 bg-[#059473] shadow-md hover:bg-green-500 text-white rounded-md font-semibold cursor-pointer text-lg">
                                                Update Password
                                        </button>
                                </div>
                        </form>
                </div>
        );
};

export default ChangePassword;
