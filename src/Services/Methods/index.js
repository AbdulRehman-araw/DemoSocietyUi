import apiInstance from '../../../axios';
import { errorHandler } from '../Methods/errorHandler';

const postConfig = {
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
    },
};

const documentConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
};

export const get = async (endPoint, data) => {
    try {
        const result = await apiInstance.get(endPoint);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const post = async (endPoint, data) => {
    try {
        const result = await apiInstance.post(endPoint, data, postConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const documentPost = async (endPoint, data) => {
    try {
        const result = await apiInstance.post(endPoint, data, documentConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const resetPasswordPost = async (endPoint, data, token) => {
    try {
        let resetpasswordConfig = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await apiInstance.post(endPoint, data, resetpasswordConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const patch = async (endPoint, data) => {
    try {
        const result = await apiInstance.patch(endPoint, data, postConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const patchPicture = async (endPoint, data) => {
    try {
        const result = await apiInstance.patch(endPoint, data, documentConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const deleted = async endPoint => {
    try {
        const result = await apiInstance.delete(endPoint);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const put = async (endPoint, data) => {
    try {
        const result = await apiInstance.put(endPoint, data, postConfig);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};
