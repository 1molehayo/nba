import * as Yup from 'yup';
import 'yup-phone';

export const RegisterSchema = Yup.object().shape({
  address: Yup.string(),
  bio: Yup.string(),
  courtNumber: Yup.number('Must be number').required(
    'Court number is required'
  ),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Password is required')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain at least 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  passwordConfirmation: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  phoneNumber: Yup.string().phone().required('Phone number is required'),
  jobType: Yup.string().required('Job type is required'),
  jobTitle: Yup.string().required('Job title is required')
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
});

export const SettingsSchema = Yup.object().shape({
  address: Yup.string(),
  bio: Yup.string(),
  court_number: Yup.number('Must be number').required(
    'Court number is required'
  ),
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  phone_number: Yup.string().phone().required('Phone number is required'),
  linkedin: Yup.string(),
  twitter: Yup.string(),
  job_title: Yup.string().required('Job title is required'),
  job_type: Yup.string().required('Job type is required')
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
});

export const ResetPasswordSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Password is required')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain at least 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  passwordConfirmation: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const ArticleSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('A short description required')
});

export const BookSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string()
});

export const EventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  venue: Yup.string().required('Venue is required'),
  time: Yup.string().nullable()
});

export const MeetingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  url: Yup.string().required('Meeting URL is required'),
  time: Yup.string().nullable(),
  platform: Yup.number().required('Platform is required')
});
