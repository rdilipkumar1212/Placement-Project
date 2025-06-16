import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader, Eye, EyeOff } from 'lucide-react';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import AuthService from '../../service/Service';
import logInImg from '../../assets/Login-logo.png';
import ForgotPasswordPopup from '../../components/containers/ForgotPasswordPopup';

const LoginPage = ({ isLoading, loginFormHeading }) => {
    const form = useForm();
    const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = form;

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onLoginFormSubmitHandler = async () => {
        const formData = getValues();
        try {
            const response = await AuthService.signin(formData);
            if (response?.status === 200) {
                toast.success('Login Successfully.');
                localStorage.setItem('token', response.userData.userToken);
                if (response.userData.userType === 'student') {
                    navigate('/' + response.userData._id + '/student-profile');
                } else {
                    navigate(
                        '/' + response.userData._id + '/' + response.userData.userType,
                    );
                }
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg flex overflow-hidden max-w-5xl w-full">
                {/* Illustration Section */}
                <div className="hidden lg:flex items-center justify-center w-1/2 p-8">
                    <img
                        src={logInImg}
                        alt="Login Illustration"
                        className="w-full h-auto"
                    />
                </div>

                {/* Form Section */}
                <div className="flex flex-col justify-center p-12 w-full lg:w-1/2">
                    <h3 className="text-3xl font-extrabold text-purple-800 mb-6 text-center">
                        {loginFormHeading || 'Welcome Back!'}
                    </h3>
                    <form
                        onSubmit={handleSubmit(onLoginFormSubmitHandler)}
                        className="space-y-8"
                    >
                        {/* Email Field */}
                        <div>
                            <label className="block text-lg font-medium font-sans text-purple-800">
                                <FaUser className="inline-block mr-2" /> Email Address
                            </label>
                            <input
                                type="email"
                                {...register('emailID', {
                                    required: 'Please enter your email.',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address.',
                                    },
                                })}
                                placeholder="Enter your email"
                                className="mt-2 w-full px-4 py-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-sans"
                            />
                            {errors.emailID && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.emailID.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-lg font-medium text-purple-800 font-sans">
                                <FaLock className="inline-block mr-2" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: 'Please enter your password.' })}
                                    placeholder="Enter your password"
                                    className="mt-2 w-full px-4 py-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-sans"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-purple-600 hover:text-purple-700 focus:outline-none font-sans"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <button
                                type="button"
                                className="text-purple-600 hover:underline text-sm font-medium font-sans"
                                onClick={() => setForgotPasswordVisible(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg text-xl font-medium hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none flex items-center justify-center gap-2 font-sans"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin font-sans" size={20} /> : 'Login'}
                            <FaArrowRight size={20} />
                        </button>
                    </form>

                    {/* Signup Section */}
                    <div className="mt-6 text-center font-sans">
                        <p className="text-gray-700 text-lg font-sans">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                className="text-purple-600 font-medium hover:underline"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Popup */}
            {isForgotPasswordVisible && (
                <ForgotPasswordPopup onClose={() => setForgotPasswordVisible(false)} />
            )}
        </div>
    );
};

export default LoginPage;
