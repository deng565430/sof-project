// 判断权限管理
export const isLoginMixin = {
	data () {
		return {
			isLogin: this.$store.getters.isLogin,
			jurisdiction: this.$store.getters.getJurisdiction
		}
	},
  mounted() {
    this.loginFlag();
  },
  activated() {},
  methods: {
    loginFlag() {
    	if (this.isLogin.msg === false) {
    		this.$alert('请先登录', '提示信息');
    		setTimeout(() => {
    		  this.$router.push('/index');
    		}, 1000)
    		return;
    	}
    	if (this.jurisdiction.code === -1) {
    		this.$alert('权限不足！', '提示信息');
    		setTimeout(() => {
    		  this.$router.push('/index');
    		}, 1000)
    		return;
    	}
    }
  }
}


