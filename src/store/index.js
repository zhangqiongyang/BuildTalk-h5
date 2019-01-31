import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);


export default new vuex.Store({
  state: {
    wxuserinfo:null,
    userInfo: '',
    openid: '',
    unionId: '',
    recevinginfo: {
      telephone: '',
      address: '',
      consignee: ''
    },
    isLogin: null,
    isBindingPhone: null,
    phoneNumber: '',
    windowHeight: '',
    platform: ''
  },
  mutations: {
    changeUserInfo(state, parameter) {
      state.wxuserinfo = parameter
    },
    changeAddress(state, recevinginfo) {
      state.recevinginfo = recevinginfo
    },
    changePhone(state, parameter) {
      state.phoneNumber = parameter
    },
    changePhoneState(state, parameter) {
      state.isBindingPhone = parameter
    },
    changeWindowsHeight(state,parameter){
      state.windowHeight = parameter
    }
  }
});

