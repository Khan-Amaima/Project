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
    loginUser : async (email, password) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.login
        const loginData = {
            "email" : email,
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
    },
    logoutUser : async (authToken) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.logout
        try {
            const response = await axios.post(url, {},{
                headers: {"Authorization" : `Token ${authToken}`}
            });
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    },
    userDetail : async (authToken) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.userDetail
        try {
            const response = await axios.get(url, {
                headers: {"Authorization" : `Token ${authToken}`}
            });
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    },
    uploadVideo : async (username, title, description, videos) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.media + EndPoints.uploadVideo
        try {
            let formData = new FormData()
            formData.append('username', username)
            formData.append('title', title)
            formData.append('description', description)
            for (let i = 0; i < videos.length; i++) {
                formData.append(videos[i].file.name, videos[i].file)
            }
            const response = await axios.post(url, formData);
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    },
    fetchVideos : async (authToken) => {
        const url = process.env.REACT_APP_BASE_URL + EndPoints.media + EndPoints.fetchVideo
        try {
            const response = await axios.get(url, {
                headers: {"Authorization" : `Token ${authToken}`}
            });
            return response;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default ApiManager;