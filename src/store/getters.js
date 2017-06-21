export const isLogin = function(state) {
    let data = {};
    data.msg = state.isLogin;
    data.name = state.userName;
    return data;
}
export const brieid = function(state) {
    let data = {};
    data.brieid = state.brieid;
    return data;
}
export const yimeicampaignmsg = function(state) {
    return state.yimeicampaignmsg;
}
