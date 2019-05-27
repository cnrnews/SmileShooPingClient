const BASURL='https://easy-mock.com/mock/5b825fd9ddcc5d66064e7dc1/SmileVue/'
const LOCALURL="http://localhost:3000/"
const URL={
    getShoppingMail:BASURL+'index',//商城首页,
    registerUser:LOCALURL+'user/register',//用户注册
    login:LOCALURL+'user/login',//用户登录
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList',//分类列表
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//二级分类列表
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//二级分类商品列表
}
module.exports=URL
