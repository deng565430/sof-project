export const userName = function() {
    if (window.localStorage) {
    	return window.localStorage.userName ? window.localStorage.userName : '';
    } else {
    	return ''
    }
}

export const isLogin = function() {
    if (window.localStorage) {
    	return window.localStorage.isLogin ? window.localStorage.isLogin : false;
    } else {
    	return false
    }
}
