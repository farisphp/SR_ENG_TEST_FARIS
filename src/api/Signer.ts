import axios from 'axios';
const baseUrl = 'http://localhost:8010/proxy/api/v1/signers';

const api = {
    create: (params = {}) => {
        return axios.post(baseUrl, {"data": params});
    },

    get: () => {
        return axios.get(baseUrl);
    },

    update: (id: string, params = {}) => {
        return axios.put(baseUrl+'/'+id, {"data": params});
    },

    delete: (id: string) => {
        return axios.delete(baseUrl+'/'+id);
    },
}

export default api;