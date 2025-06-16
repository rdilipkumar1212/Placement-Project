import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMail, HiPhone, HiLockClosed, HiUser } from 'react-icons/hi'; // React icons
import PasswordInput from '../../components/inputField/PasswordInput';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sigin from '../../assets/signin.png'
import AuthService from '../../service/Service';
import {
  companyNameValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  phoneValidation,
  studentIdValidation,
  staffIdValidation,
  collegeNameValidation,
  companyPhoneNumberValidation,
  companyDescriptionValidation,
  totalEmployeesValidation,
  industryValidation,
  locationValidation,
} from '../../utils/formValidation';

const SignupFormPage = ({ isLoading }) => {
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = form;

  const [userType, setUserType] = useState('student');

  const onSignupFormSubmitHandler = async () => {
    const formData = getValues();
    const payload = { ...formData, userType };

    try {
      const response = await AuthService.signup(payload);
      toast.success('Signup Successful.');
      handleFormReset();
      navigate('/signin');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    }
  };

  const handleFormReset = () => {
    reset();
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    reset({
      firstName: '',
      lastName: '',
      emailID: '',
      phone: '',
      collegeName: '',
      studentID: '',
      staffID: '',
      company: '',
      industry: '',
      location: '',
      totalEmployees: '',
      companyPhoneNumber: '',
      companyDescription: '',
      password: '',
      cpass: '',
    });
  };

  return (
    <div
      className="font-sans flex justify-center items-center gap-5 bg-white shadow-lg rounded-lg  px-20"
      style={{
        width: '100%',
        padding: '20px',
      }}
    >
      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <img src={sigin}
         alt="Signin" className="w-full max-w-sm" />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSignupFormSubmitHandler)}
        noValidate
        className="w-full max-w-4xl shadow-lg rounded-lg bg-white  p-8 flex flex-col gap-6 font-sans"
      >
        <h2 className="text-2xl font-semibold text-center text-purple-800 font-sans">
          Signup
        </h2>

        {/* User Type Dropdown */}
        <div className="w-full font-sans">
          <label className="block text-sm font-medium text-purple-700 mb-2 font-sans">
            Select User Type <span className="text-red-500">*</span>
          </label>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring focus:ring-purple-300 font-sans"
          >
            <option value="student" >Student</option>
            <option value="college-staff">College Staff</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center max-w-4xl mx-auto text-purple-800 font-sans" 
        style={{ fontFamily: 'Poppins, sans-serif' }}>
          <InputField
            placeholder="First Name"
            label="First Name"
            icon={<HiUser className="text-purple-500 font-sans " />}
            validationObj={{ ...register('firstName', firstNameValidation) }}
            error={errors.firstName?.message}
            isRequired={true}
          />

          <InputField
            placeholder="Last Name"
            label="Last Name"
            icon={<HiUser className="text-purple-500" />}
            validationObj={{ ...register('lastName', lastNameValidation) }}
            error={errors.lastName?.message}
            isRequired={true}
          />

          <InputField
            placeholder="Email Address"
            label="E-Mail"
            icon={<HiOutlineMail className="text-purple-500" />}
            validationObj={{ ...register('emailID', emailValidation) }}
            error={errors.emailID?.message}
            isRequired={true}
          />

          <InputField
            placeholder="Phone Number"
            label="Phone Number"
            type="number"
            icon={<HiPhone className="text-purple-500" />}
            validationObj={{ ...register('phone', phoneValidation) }}
            error={errors.phone?.message}
            isRequired={true}
          />

          {/* Conditional fields */}
          {userType === 'student' && (
            <>
              <InputField
                placeholder="College Name"
                label="College Name"
                validationObj={{
                  ...register('collegeName', collegeNameValidation),
                }}
                error={errors.collegeName?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Student ID"
                label="Student ID"
                type="number"
                validationObj={{
                  ...register('studentID', studentIdValidation),
                }}
                error={errors.studentID?.message}
                isRequired={true}
              />
            </>
          )}

          {userType === 'college-staff' && (
            <>
              <InputField
                placeholder="College Name"
                label="College Name"
                validationObj={{
                  ...register('collegeName', collegeNameValidation),
                }}
                error={errors.collegeName?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Staff ID"
                label="Staff ID"
                type="number"
                validationObj={{
                  ...register('staffID', staffIdValidation),
                }}
                error={errors.staffID?.message}
                isRequired={true}
              />
            </>
          )}

          {userType === 'company' && (
            <>
              <InputField
                placeholder="Company Name"
                label="Company Name"
                validationObj={{
                  ...register('company', companyNameValidation),
                }}
                error={errors.company?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Industry"
                label="Industry"
                validationObj={{
                  ...register('industry', industryValidation),
                }}
                error={errors.industry?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Location"
                label="Location"
                validationObj={{
                  ...register('location', locationValidation),
                }}
                error={errors.location?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Total Employees"
                label="Total Employees"
                type="number"
                validationObj={{
                  ...register('totalEmployees', totalEmployeesValidation),
                }}
                error={errors.totalEmployees?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Company Phone Number"
                label="Company Phone Number"
                type="number"
                validationObj={{
                  ...register('companyPhoneNumber', companyPhoneNumberValidation),
                }}
                error={errors.companyPhoneNumber?.message}
                isRequired={true}
              />
              <InputField
                placeholder="Company Description"
                label="Description"
                validationObj={{
                  ...register('companyDescription', companyDescriptionValidation),
                }}
                error={errors.companyDescription?.message}
                isRequired={true}
              />
            </>
          )}

          <PasswordInput
            placeholder="Password"
            label="Password"
            icon={<HiLockClosed className="text-purple-500" />}
            validationObj={{ ...register('password', passwordValidation) }}
            error={errors.password?.message}
            isRequired={true}
          />

          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            icon={<HiLockClosed className="text-purple-500" />}
            validationObj={{
              ...register('cpass', {
                ...passwordValidation,
                validate: {
                  same: (value) =>
                    value === getValues().password ||
                    "Password and Confirm Password don't match!",
                },
              }),
            }}
            error={errors.cpass?.message}
            isRequired={true}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 transition duration-300 font-sans"
        >
          Submit
        </button>

        <p className="text-center text-neutral-700 mt-2 font-sans">
          Already have an account?{' '}
          <span
            className="text-purple-700 underline cursor-pointer font-sans"
            onClick={() => navigate(`/signin`)}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupFormPage;
