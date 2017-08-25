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
export const yimeicampaignmsg = state => state.yimeicampaignmsg;

export const userName = state => state.userName;

export const dialogVisible = state => state.dialogVisible;

export const getMenu = state => state.menu;

export const getJurisdiction = state => state.jurisdiction;
