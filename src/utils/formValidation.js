export const firstNameValidation = {
  required: {
    value: true,
    message: 'Please enter your first name.',
  },
};

export const lastNameValidation = {
  required: {
    value: true,
    message: 'Please enter your last name.',
  },
};
export const fathersNameValidation = {
  required: {
    value: true,
    message: "Please enter your father's name.",
  },
};
export const mothersNameValidation = {
  required: {
    value: true,
    message: "Please enter your mother's name.",
  },
};
export const rollNumberValidation = {
  required: {
    value: true,
    message: 'Please enter the Roll Number.',
  },
};
export const degreeValidation = {
  required: {
    value: true,
    message: 'Please enter your Degrees',
  },
};
export const collegeNameValidation = {
  required: {
    value: true,
    message: 'Please enter your College Name',
  },
};
export const cgpaValidation = {
  required: {
    value: true,
    message: 'Please enter your CGPA',
  },
};
export const yearOfPassingValidation = {
  required: {
    value: true,
    message: 'Please enter your Year of Passing',
  },
};

export const emailValidation = {
  required: {
    value: true,
    message: 'Please enter your email address.',
  },
  pattern: {
    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please enter a valid Email address',
  },
};

export const phoneValidation = {
  required: {
    value: true,
    message: 'Please enter your Phone No.',
  },
  maxLength: {
    value: 10,
    message: 'Please Enter Phone Number under 10 digits',
  },
  minLength: {
    value: 10,
    message: 'Please Enter Phone Number under 10 digits',
  },
};

export const passwordValidation = {
  required: {
    value: true,
    message: 'Please enter your Password.',
  },
  minLength: {
    value: 6,
    message: 'Please enter a strong password of length more than 5.',
  },
};

export const staffIdValidation = {
  required: {
    value: true,
    message: 'Please enter your Staff-ID',
  },
};
export const companyNameValidation = {
  required: {
    value: true,
    message: 'Please enter your company name.',
  },
};
export const industryValidation = {
  required: {
    value: true,
    message: 'Please enter Industry.',
  },
};

export const locationValidation = {
  required: {
    value: true,
    message: 'Please enter Location.',
  },
};

export const totalEmployeesValidation = {
  required: {
    value: true,
    message: 'Please enter your Total Employees.',
  },
};

export const companyPhoneNumberValidation = {
  required: {
    value: true,
    message: 'Please enter Company Phone Number.',
  },
};

export const companyDescriptionValidation = {
  required: {
    value: true,
    message: 'Please enter Company Description.',
  },
};

export const studentIdValidation = {
  required: 'Student ID is required', 
  pattern: {
    value: /^[0-9]{6,10}$/, // allows only numeric IDs between 6 to 10 digits long
    message: 'Student ID should be a number with 6 to 10 digits', // error message if validation fails
  },
};
