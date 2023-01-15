import axios from 'axios';
let userData = JSON.parse(localStorage.getItem('userData'));
let token = '';
let axiosAuthenticatedInstance;
let axiosAuthenticatedMultiPartFormInstance;
if (userData) {
    token = userData.token;
    axiosAuthenticatedInstance = axios.create({
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    axiosAuthenticatedMultiPartFormInstance = axios.create({
        headers: {
            ContentType: 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    });
}

export { axiosAuthenticatedInstance, axiosAuthenticatedMultiPartFormInstance };    
