import { tokenizeAxios, axios } from './axios';


export class AuthApiError extends Error {  
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
    async login(email, password) {
        let response
        try {
            response = await axios.post('/token/obtain/', {email, password})
        }
        catch(error) {
            let responseError = error.response
            if (responseError.status == 401) {
                throw new CredentialsError(responseError.data.detail)
            }
            throw new AuthApiError(responseError)
        }
        if (!(response.data && response.data.access)){
            throw new AuthApiError("Something go wrong!")
        }
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        return response.data
    } 

    async register(payload) {
        const response = await axios.post('/register/', { ...payload });
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
        const response = await tokenizeAxios.get('/current-user/');
        return response.data;
    }
}

export default new AuthService()