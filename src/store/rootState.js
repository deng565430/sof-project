import * as util from '../util/user'
const state = {
    dialogVisible: false,
    dialogForm: false,
    isLogin: util.isLogin(),
    userName: util.userName(),
    searchValue: {
        project: '',
        type: '',
        minbatch: '',
        maxbatch: ''
    },
    brieid: '',
    yimei: {
        cname: '',
        proname: '',
        num: '',
        stratime: '',
        endtime: '',
        totalcont: '',
        totalcont2: '',
        totalcont3: '',
        totalcont4: ''
    },
    yimeichange: {
        cname: '',
        proname: '',
        num: '',
        stratime: '',
        endtime: ''
    },
    yimeicampaignmsg: '',
    commitIs: false,
    menu: [],
    jurisdiction: {
        code: -1,
        path: '/index'
    }
};

export default state;