import * as yup from 'yup';

export const schema = yup.object().shape({
    first_name: yup
        .string()
        .required('Fisrt name is requied.')
        .matches(/^[aA-zZ\s]+$/),
    middle_initial: yup
        .string()
        .max(1, 'Enter initial only.')
        .matches(/^[a-zA-Z]*$/),
    last_name: yup
        .string()
        .required('Last name is requied.')
        .matches(/^[aA-zZ\s]+$/),
    email: yup.string().email().required('Email is requied.'),
    active: yup.boolean().required(),
    district: yup.number().required('Please select a district.')
});
