export const isLogin = (state) => {
    let data = {}
    data.msg = state.isLogin;
    data.name = state.userName;
    return data;
}
