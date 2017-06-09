import axios from 'axios';
const root =  'http://114.215.209.180:8080'; // http://114.215.209.180:8080

export default {
    get: function(url) {
        var result = axios({
            method: 'get',
            url: `${root}${url}`,
            withCredentials: true
        });
        return result;
    },
    post: function(url, data){
        var result = axios({
            method: 'post',
            url: `${root}${url}`,
            data: data,
            withCredentials: true
        });
        return result;
    },
    url: function(url) {
        return `${root}${url}`
    }
}