import EndPoints from "./EndPoints";
import axios from 'axios';

const ApiManager = {
    signUpUser : async (userName, email, password) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.signUp
        const signupData = {
            "username" : userName,
            "email": email,
            "password": password
        }
        try {
            const response = await axios.post(url, signupData);
            console.log(response);
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    },
    loginUser : async (userName, password) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.login
        const loginData = {
            "username" : 'tset',
            "password": password
        }
        try {
            const response = await axios.post(url, loginData);
            console.log(response);
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default ApiManager;