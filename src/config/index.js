import { validateName, validateEmail, validatePassword } from '../utils/validation';

const skills = ['Java', 'Python', 'Go', 'JavaScript', 'Ada', 'C++', 'Ruby' ];


export const loginFields = [
  {
    name: 'email',
    label: 'Email',
    validator: validateEmail,
    grid: {
      xs: 12
    },
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    validator: validatePassword,
    type: 'password',
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
]

export const freelancerFields = [
  {
    name: 'firstName',
    label: 'First name',
    validator: validateName,
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'lastName',
    label: 'Last name',
    validator: validateName,
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    validator: validateEmail,
    grid: {
      xs: 12
    },
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    validator: validatePassword,
    type: 'password',
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'skills',
    label: 'Your skills *',
    type: 'select',
    id: 'skills',
    multiple: true,
    grid: {
      xs: 12
    },
    list: skills
  },
  {
    name: 'files',
    label: 'Attachment',
    type: 'file',
    id: 'files',
    multiple: true,
    grid: {
      xs: 12
    },
    list: skills
  },
  
];

export const employerFields = [
  {
    name: 'firstName',
    label: 'First name',
    validator: validateName,
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'lastName',
    label: 'Last name',
    validator: validateName,
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    validator: validateEmail,
    grid: {
      xs: 12
    },
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    validator: validatePassword,
    type: 'password',
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    grid: {
      xs: 12,
      sm: 6
    },
    required: true
  }
];