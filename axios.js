import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalVariable} from './src/enviroment/GlobalVariable';

export const baseUrl = globalVariable?.baseUrl; //add base url here
const projectName = globalVariable?.society;

const apiInstance = axios.create({
  baseURL: baseUrl + 'api',
});

apiInstance.interceptors.request.use(
  async request => {
    const token = await AsyncStorage.getItem('token');
    let tokenParse = JSON.parse(token);
    if (tokenParse) {
      request.headers = {
        Authorization: `Bearer ${tokenParse}`,
        'Content-Type': request.headers['Content-Type'],
        projectname: projectName,
      };
    } else if (request.headers['Authorization']) {
      request.headers = {
        'Content-Type': request.headers['Content-Type'],
        Authorization: request.headers['Authorization'],
        projectname: projectName,
      };
    } else {
      request.headers = {
        'Content-Type': request.headers['Content-Type'],
        projectname: projectName,
      };
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiInstance;
