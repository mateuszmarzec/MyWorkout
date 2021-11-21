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
        try {
            let response = await axios.post('/token/obtain/', {email, password})
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

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    getCurrentUser() {
        return tokenizeAxios.get('/current-user/')
        .then(response => {
            return response.data
        })
    }
}

export default new AuthService()