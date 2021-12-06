import { tokenizeAxios, axios } from './axios';
import useSWR from 'swr'


export class AuthError extends Error {  
    constructor(message) {
        super(message)
  }
}

export class CredentialsError extends Error {  
    constructor(message) {
        super(message)
  }
}

const fetcher = url => tokenizeAxios.get(url).then(res => res.data)
class AuthService {
    baseLogin = async(endpoint, data) => {
        let response
        try {
            response = await axios.post(endpoint, data)
        }
        catch(error) {
            let responseError = error.response
            if (responseError.status === 400) {
                throw new CredentialsError(responseError.data.nonFieldErrors)
            }
            throw new AuthError(responseError)
        }
        if (!(response.data && response.data.accessToken)){
            throw new AuthError("Something go wrong!")
        }
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data
    }
    login = async(data) => {
        return await this.baseLogin('/login/', data)
    } 

    async register(payload) {
        const response = await axios.post('/registration/', { ...payload });
        return response.data;
    }

    async validateEmail(email) {
        const response = await axios.get(`/validate-email/${email}`);
        return response.data;
    }

    async confirmEmail(key) {
        const response = await axios.post('/registration/verify-email/', {key});
        return response.data;
    }

    async logout() {
        await axios.post('/logout/');
        localStorage.removeItem('accessToken');
    }

    async passwordReset(data) {
        return await axios.post('/password/reset/', { ...data});
    }

    async passwordResetConfirm(data) {
        return await axios.post('/password/reset/confirm/', { ...data});
    }

    useUser = () => {
        const { data, error, isValidating } = useSWR(this.getAccessToken()? '/user/': null, fetcher, {revalidateOnFocus: false})
        return {
            user: data,
            isValidating: isValidating,
            isError: error
        }
    }

    googleLogin = async(accesstoken) => {
        return await this.baseLogin(
            "/social/google/",
            {
                access_token: accesstoken,
            }
            )
    };
    facebookLogin = async(accesstoken) => {
        return await this.baseLogin(
            "/social/facebook/",
            {
                access_token: accesstoken,
            }
            )
    };
    getAccessToken = () => {
        if (process.browser) {
            return localStorage.getItem('accessToken')
        }
    }
}

export default new AuthService()