import axios from 'axios';
import { baseUrl } from './env.js';

export default {
    get: function(url) {
        var result = axios({
            method: 'get',
            url: baseUrl + url,
            withCredentials: true
        });
        return result;
    },
    post: function(url, data){
        var result = axios({
            method: 'post',
            url: baseUrl + url,
            data: data,
            withCredentials: true
        });
        return result;
    },
    url: function(url) {
        return baseUrl + url
    }
}