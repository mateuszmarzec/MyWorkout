import { tokenizeAxios, axios } from './axios';


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


class AuthService {
    baseLogin = async(endpoint, data) => {
        let response
        try {
            response = await axios.post(endpoint, data)
        }
        catch(error) {
            let responseError = error.response
            if (responseError.status == 401) {
                throw new CredentialsError(responseError.data.detail)
            }
            throw new AuthError(responseError)
        }
        if (!(response.data && response.data.accessToken)){
            throw new AuthError("Something go wrong!")
        }
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
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

    async activate(uidb64, token) {
        const response = await axios.post('/activate/', { uidb64, token });
        return response.data;
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    async getCurrentUser() {
        const response = await tokenizeAxios.get('/user/');
        return response.data;
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
}

export default new AuthService()