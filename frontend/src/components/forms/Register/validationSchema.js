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
    password: yup.string().required().test('len', 'Must be more than 8 characters', val => val.length > 8),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Must match'),
})
