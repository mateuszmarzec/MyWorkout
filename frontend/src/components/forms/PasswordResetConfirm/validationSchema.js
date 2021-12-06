import * as yup from 'yup';

export default 
    yup.object().shape({
        new_password1: yup.string().required().test('len', 'Must be more than 8 characters', val => val && val.length > 8),
        new_password2: yup.string().required().oneOf([yup.ref('new_password1'), null], 'Passwords must match'),
    })
