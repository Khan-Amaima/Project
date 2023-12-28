import EndPoints from "./EndPoints";
import axios from 'axios';

const ApiManager = {
    signUpUser : async (userName, email, password) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.signUp
        console.log(url, userName, email, password)
        const postData = {
            "username" : "A2BCsDc8ssssss",
            "password": "1234",
            "email": "Ab2cssscsdss8s@gmail.com"
        }
        try {
            const response = await axios.post('http://localhost:8000/Account/user-signup', postData);
            console.log(response);
        } 
        catch (error) {
            console.error(error);
        }
    },
    loginUser : (userName, password) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.login
        console.log(url, userName, password)
        return url
    }
}

export default ApiManager;