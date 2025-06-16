import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import AuthService from "../../service/Service";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(""); 
    const [generatedOtp, setGeneratedOtp] = useState(""); 
    const [newPassword, setNewPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false); 

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    };

    const handleSendOtp = async () => {
        const otp = generateOtp();
        setGeneratedOtp(otp); // Store the generated OTP in state

        const formData = {
            email: email,
            message: `Your OTP for password reset is: ${otp}`,
        };

        try {
            const response = await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                formData,
                process.env.REACT_APP_USER_ID
            );

            console.log("Email sent successfully!", response.status, response.text);
            toast.success("OTP sent successfully to your email.");
            setIsOtpSent(true); // Update state to show OTP verification form
        } catch (err) {
            console.error("Failed to send email. Error: ", err);
            toast.error("Failed to send OTP email.");
        }
    };

    const handleOtpVerification = () => {
        if (otp === generatedOtp) {
            toast.success("OTP verified successfully.");
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    const handlePasswordReset = async () => {
        // Here you can add your logic for password reset
        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        try {
            const body = {
                email: email,
                newPassword: newPassword,
            }
            const result = await AuthService.forgotPassword(body);
            console.log("result", result);

            if (result.status === 200) {
                toast.success(result.data.message || 'Password updated successfully.');
                onClose(); // Close the popup after success
            } else {
                toast.error(result.data.message || 'Failed to update password.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }

        setEmail("");
        setOtp("");
        setGeneratedOtp("");
        setNewPassword("");
        setIsOtpSent(false);
        onClose(); // Close the popup
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

                {/* Step 1: Input Email */}
                {!isOtpSent ? (
                    <div>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full mt-2 px-4 py-2 border rounded-md"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                            >
                                Send OTP
                            </button>
                        </form>
                    </div>
                ) : (
                    // Step 2: Verify OTP and Reset Password
                    <div>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter the OTP sent to your email"
                                    className="w-full mt-2 px-4 py-2 border rounded-md"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleOtpVerification}
                                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                            >
                                Verify OTP
                            </button>

                            {/* After OTP is verified, allow password reset */}
                            {otp === generatedOtp && (
                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter your new password"
                                            className="w-full mt-2 px-4 py-2 border rounded-md"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handlePasswordReset}
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                        style={{ marginTop: "5px" }}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                <button
                    className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
