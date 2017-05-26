const state = {
    msg: '我是原始数据',
    dialogVisible: false,
    dialogForm: false,
    isLogin: false,
    userName: '',
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
    data: [{
        name: '餐厅'
    }, {
        name: '酒店'
    }, {
        name: '饭馆'
    }]
};

export default state;