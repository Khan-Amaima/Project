import EndPoints from "./EndPoints";
import axios from "axios";

const ApiManager = {
  signUpUser: async (userName, email, password) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.signUp;
    const signupData = {
      name: userName,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(url, signupData);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  loginUser: async (email, password) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.login;
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(url, loginData);
      return response.data;
    } catch (error) {
      let response = error.response.data;
      return response
    }
  },
  logoutUser: async (authToken) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.logout;
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Token ${authToken}` },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  userDetail: async (authToken) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.userDetail;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Token ${authToken}` },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getProfile: async (authToken) => {
    const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.getProfile;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Token ${authToken}` },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateProfile: async (authToken, profilePicture) => {
    const url = process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.updateProfile;
    try {
      let formData = new FormData();
      formData.append("profilePicture", profilePicture);
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Token ${authToken}` },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  uploadVideo: async (email, title, description, videos, primaryAudio = null) => {
    console.log(primaryAudio, 'sajdflkjasdlkjflkjasdlk')
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.media + EndPoints.uploadVideo;
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("primaryAudio", primaryAudio);
      for (let i = 0; i < videos.length; i++) {
        formData.append(videos[i].file.name, videos[i].file);
      }
      const response = await axios.post(url, formData);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  fetchVideos: async (authToken) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.media + EndPoints.fetchVideo;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Token ${authToken}` },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deleteVideo: async (authToken, itemId) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.media + EndPoints.deleteVideo;
    try {
      const response = await axios.put(
        url,
        {
          id: itemId,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  UpdatePassword: async (authToken, old_password, new_password) => {
    const url =
      process.env.REACT_APP_BASE_URL + EndPoints.auth + EndPoints.UpdatePassword;
    try {
      const response = await axios.post(
        url,
        {
          "old_password" : old_password,
          "new_password" : new_password
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default ApiManager;
