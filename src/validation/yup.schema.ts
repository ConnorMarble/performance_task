import * as yup from "yup";

export const schema = yup.object().shape({
    first_name: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/),
    middle_initial: yup
        .string()
        .max(1)
        .matches(/^[a-zA-Z]*$/),
    last_name: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/),
    email: yup.string().email().required(),
    active: yup.boolean().required(),
    district: yup.number().required(),
});
