import * as yup from 'yup';
import authService from '../../../services/auth.service';

export default 
yup.object().shape({
    email: yup.string().email().required().test(
        "validate-email",   
        "Email must to be unique",
        (value) => (
            value && authService.validateEmail(value).then(() => {return true}).catch(() => {return false})
        )
    ),
    password1: yup.string().required().test('len', 'Must be more than 8 characters', val => val && val.length > 8),
    password2: yup.string().required().oneOf([yup.ref('password1'), null], 'Must match'),
})
