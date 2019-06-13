import axios from 'axios'

axios.defaults.withCredentials = true

/*  封装ajax方法 */
const requestResponse = (type, url, data) => {
  if (!type) type = 'GET';
  if (!data) data = null;
  type = type.toUpperCase();
  if (type == 'GET') return axios.get(url, {params: data});
  if (type == 'PUT') return axios.put(url, qsToformdata(data));
  if (type == 'POST') return axios.post(url, qsToformdata(data))
}
/* json数据转化成formdata数据格式 */
const qsToformdata = (json) => {
  if (!json) return null;
  var fd = new FormData();
  var jn = '';
  for (jn in json) {
    var jsonLi = json[jn];
    if (jsonLi.constructor === Array) {
      if (jsonLi.length === 0) {
        fd.append(jn, '')
      } else {
        if ((jsonLi[0]).constructor === File) {
          jsonLi.forEach((curr, index) => {
            fd.append(jn, curr)
          })
        } else {
          fd.append(jn, jsonLi)
        }
      }
    } else {
      fd.append(jn, jsonLi)
    }
  }
  fd;
  return fd
}
var smaBaseUrl = '/api'
if (process.env.NODE_ENV === 'production') {
  smaBaseUrl = process.env.API_ROOT
}

//微信config
var getWX = () => requestResponse('POST', smaBaseUrl + '/getSignPackage');


//首页
//从后台获取用户数据
var getUserInfo = () => requestResponse('POST', smaBaseUrl + '/searchuserinfo');
// 首页轮播图信息接口
var getslideshowInfo = () => requestResponse('POST', smaBaseUrl + '/getindexpic');
// 首页新闻信息接口
var getIndexNewsInfo = () => requestResponse('POST', smaBaseUrl + '/searchallrecommend');
// 首页课程推荐信息接口
var getIndexCourseInfo = () => requestResponse('POST', smaBaseUrl + '/getindexinfo');
// 首页作者推荐信息接口
var getIndexAuthorInfo = () => requestResponse('POST', smaBaseUrl + '/searchrecommendauthor');


//全部新闻页面
// 全部作者推荐信息接口
var getAllNewsInfo = (json) => requestResponse('POST', smaBaseUrl + '/searchallnews',json);

//全部作者页面
// 全部作者推荐信息接口
var getAllAuthorInfo = () => requestResponse('POST', smaBaseUrl + '/searchallauthor');

//全部课程页面
// 全部课程推荐信息接口
var getAllCourseInfo = () => requestResponse('POST', smaBaseUrl + '/getrecommend');

//作者页面
// 根据作者id查询作者信息
var getAuthorInfo = (json) => requestResponse('POST', smaBaseUrl + '/getauthorarticle', json);

//列表页面
// 根据课程id查询课程信息
var getCourseInfo = (json) => requestResponse('POST', smaBaseUrl + '/courselistinfo', json);

//搜索页面
//根据openid查询历史纪录接口
var selectHistory=(json)=>requestResponse('POST',smaBaseUrl+'/getSearchHistory',json);
//根据关键字和openid进行搜索
var searchkeywords=(json)=>requestResponse('POST',smaBaseUrl+'/searchkeywords',json);
//删除历史纪录
var deleteHistory=(json)=>requestResponse('POST',smaBaseUrl+'/deleteSearchHistory',json);

//视频页面
//根据article_id和openid查询视频文章信息
var getArticleInfo=(json)=>requestResponse('POST',smaBaseUrl+'/getArticleinfobyArticleId',json);
//根据article_id和openid查询留言信息
var getArticleGuestbookInfo=(json)=>requestResponse('POST',smaBaseUrl+'/orderbyguestbook',json);
//文章点赞上传接口
var uploadArticleLikeInfo=(json)=>requestResponse('POST',smaBaseUrl+'/collectarticle',json);
//留言点赞上传接口
var uploadMsgLikeInfo=(json)=>requestResponse('POST',smaBaseUrl+'/updateguestbook',json);
//用户浏览记录上传接口
var uploadTrace=(json)=>requestResponse('POST',smaBaseUrl+'/saveBrowseRecord',json);

//留言页面
//根据article_id和openid查询留言信息
var getMyGuestbookInfo=(json)=>requestResponse('POST',smaBaseUrl+'/getguestbookbyopenid',json);
//上传留言接口
var uploadMsg=(json)=>requestResponse('POST',smaBaseUrl+'/saveguestbook',json);
//删除留言接口
var delMyMsg=(json)=>requestResponse('POST',smaBaseUrl+'/deleteguestbook',json);

//购买页面
// 获取收货地址信息
var getAddress=(json)=>requestResponse('POST',smaBaseUrl+'/searchRecevingAddress',json);
// 查询订单号
var checkOrder=(json)=>requestResponse('POST',smaBaseUrl+'/iscreateorder',json);
// 生成订单接口
var creatOrder=(json)=>requestResponse('POST',smaBaseUrl+'/fwhunifiedorderhandle',json);
// 修改订单状态接口
var changeOrderInfo=(json)=>requestResponse('POST',smaBaseUrl+'/updateorderstatus',json);
// 查询支付状态接口
var searchPayStatus=(json)=>requestResponse('POST',smaBaseUrl+'/searchorderis_pay',json)


//我的留言页面
//获取我的留言信息
var getMyMsg=(json)=>requestResponse('POST',smaBaseUrl+'/myguestbook',json);


//我的留言详情页面
//根据guestbook_id查询此条留言信息
var getMyMsgDetail=(json)=>requestResponse('POST',smaBaseUrl+'/getguestbookinfobyId',json);


//已购页面
//根据openid查询已经购买的课程文章
var getAlreadyBought=(json)=>requestResponse('POST',smaBaseUrl+'/alreadybuy',json);


//收货地址页面
//上传收货地址信息
var uploadAddress=(json)=>requestResponse('POST',smaBaseUrl+'/saveRecevingAddress',json);


//手机号
//发送短信
var sendCode=(json)=>requestResponse('POST',smaBaseUrl+'/sendSms',json);
//获取验证码
var getCode=(json)=>requestResponse('POST',smaBaseUrl+'/checkcodevalid',json);


//检查是否绑定了手机号
var checkBindMobile=(json)=>requestResponse('POST',smaBaseUrl+'/checkbindmobile',json);


export {
  getWX,
  getUserInfo,
  getIndexNewsInfo,
  getslideshowInfo,
  getIndexCourseInfo,
  getIndexAuthorInfo,
  getAllAuthorInfo,
  getAllNewsInfo,
  getAllCourseInfo,
  getAuthorInfo,
  getCourseInfo,
  selectHistory,
  searchkeywords,
  getArticleInfo,
  getAddress,
  checkOrder,
  creatOrder,
  changeOrderInfo,
  getArticleGuestbookInfo,
  getMyGuestbookInfo,
  uploadMsg,
  delMyMsg,
  getMyMsg,
  getMyMsgDetail,
  getAlreadyBought,
  uploadAddress,
  sendCode,
  getCode,
  uploadArticleLikeInfo,
  uploadMsgLikeInfo,
  deleteHistory,
  checkBindMobile,
  uploadTrace,
  searchPayStatus
}
