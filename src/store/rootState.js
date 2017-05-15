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
    data: [{
        name: '餐厅'
    }, {
        name: '酒店'
    }, {
        name: '饭馆'
    }]
};

export default state;