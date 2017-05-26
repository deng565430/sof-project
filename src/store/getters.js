export const isLogin = (state) => {
    let data = {}
    data.msg = state.isLogin;
    data.name = state.userName;
    return data;
}
export const brieid = (state) => {
    let data = {}
    data.brieid = state.brieid;
    return data;
}
export const yimeicampaignmsg = (state) => {
    return state.yimeicampaignmsg;
}