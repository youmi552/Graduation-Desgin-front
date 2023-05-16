import axios from "../utils/request"
import base from "./base"
import axios2 from "axios"

   var ego = localStorage.getItem("ego")
   var token=""  
   if (ego!=null){
     token=JSON.parse(localStorage.getItem("ego")).data.token
   }


const api ={
    setToken(){
        token=JSON.parse(localStorage.getItem("ego")).data.token
    },
    getCodeByPhoneNumber(phonenumber){
        return axios.get(base.baseUrl+base.common.register+"/"+phonenumber)
    },
    register(params){
        return axios.post(base.baseUrl+base.common.register,params)
    },
    login(params){
        return axios.post(base.baseUrl+base.common.login,params)
    },
    loginByPhoneNumber(params){
        return axios.post(base.baseUrl+base.common.loginByPhoneNumber,params)
    },
    getAllProducts(pageParams){
        return axios.post(base.baseUrl+base.user.getProducts,pageParams,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getProductsByCategory(pageParams,cid){
        return axios.post(base.baseUrl+base.user.getProductsByCategory,{
            pagenumber:pageParams.pagenumber,
            pagesize:pageParams.pagesize,
            cid:cid,
        },{
            headers:{
                'Authorization':token,
            }
        })
    },
    getProductsByUid(uid,pageParams){
        return axios.post(base.baseUrl+base.user.getProducts+"/"+uid,pageParams,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAllCategorys(){
        return axios.get(base.baseUrl+base.user.getCategorys,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAllQuestionCategorys(){
        return axios.get(base.baseUrl+base.user.getQuestionCategorys,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addProduct(params){
        return axios.post(base.baseUrl+base.user.Product,params,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getProduct(gid){
        return axios.get(base.baseUrl+base.user.Product+"/"+gid,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addPicture2(fileParams){
        const formData = new FormData();
        formData.append("f1", fileParams.f1)
        formData.append("gid",fileParams.gid)
        console.log(formData.get("gid"))
        return axios.post(base.baseUrl+base.user.addPicture,formData,
        {
            headers:{
                'Authorization':token,
                'Content-Type':"multipart/form-data; boundary=<calculated when request is sent>",
            },
            formData:formData
        })
    },
    addPicture(fileParams){
       return axios2({
            method: 'post',
            url: base.baseUrl+base.user.addPicture,
            data: fileParams,
             headers: {
                'Authorization':token,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
             }
         })
    },
    collection(gid,isCollection){
        return axios.post(base.baseUrl+base.user.collection,{
            "gid":gid,
            "isCollection":isCollection
        },{
            headers:{
                'Authorization':token,
            }
        })
    },
    getUserCart(){
        return axios.get(base.baseUrl+base.user.cart,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addProductInCart(gid){
        return axios.post(base.baseUrl+base.user.cart+"/"+gid,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    removeProductInCart(gid){
        return axios.delete(base.baseUrl+base.user.cart+"/"+gid,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addAdvice(params){
        return axios.post(base.baseUrl+base.user.advice,params,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addPhoto(fileParams){
        return axios2({
             method: 'post',
             url: base.baseUrl+base.user.addPhoto,
             data: fileParams,
              headers: {
                 'Authorization':token,
                 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
              }
          })
     },
    getUserHistory(){
        return axios.get(base.baseUrl+base.user.history,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getUserCollection(){
        return axios.get(base.baseUrl+base.user.collection,{
            headers:{
                'Authorization':token,
            }
        })
    },
    createOrder(order){
        return axios.post(base.baseUrl+base.user.order,order,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getOrder(){
        return axios.get(base.baseUrl+base.user.order,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getSell(){
        return axios.get(base.baseUrl+base.user.sell,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getOrderDetail(oid){
        return axios.get(base.baseUrl+base.user.orderDetail+"/"+oid,{
            headers:{
                'Authorization':token,
            }
        })
    },
    upDateOrder(oid){
        return axios.put(base.baseUrl+base.user.order,{
            "oid":oid,
        },{
            headers:{
                'Authorization':token,
            }
        })
    },
    updateAvatar(avatarNumber){
        return axios.put(base.baseUrl+base.user.avatar,{
           "avatarNumber":avatarNumber,
        },{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                'Authorization':token,
            }
        })
    },
    getData(){
        return axios.get(base.baseUrl+base.admin.data,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getUserData(){
        return axios.get(base.baseUrl+base.admin.userData,{
            headers:{
                'Authorization':token,
            }
        })
    },
    updateUserData(user){
        return axios.put(base.baseUrl+base.admin.userData,user,{
            headers:{
                'Authorization':token,
            }
        })
    },
    deleteUser(uid){
        return axios.delete(base.baseUrl+base.admin.userData+"/"+uid,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addCategory(categoryParam){
        return axios.post(base.baseUrl+base.admin.category,categoryParam,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAllAdvice(){
        return axios.get(base.baseUrl+base.admin.advice,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAdvice(aid){
        return axios.get(base.baseUrl+base.admin.adviceDetail+"/"+aid,{
            headers:{
                'Authorization':token,
            }
        })
    },
    confirmAdvice(aid){
        return axios.put(base.baseUrl+base.admin.advice+"/"+aid,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    deleteAdvice(){
        return axios.delete(base.baseUrl+base.admin.advice,{
            headers:{
                'Authorization':token,
            }
        })
    },
    allow(gid){
        return axios.post(base.baseUrl+base.admin.allow+"/"+gid,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    ban(gid){
        return axios.post(base.baseUrl+base.admin.ban+"/"+gid,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAllProductsWithAdmin(pageParams){
        return axios.post(base.baseUrl+base.admin.goods,pageParams,{
            headers:{
                'Authorization':token,
            }
        })
    },
    updateUserInfo(username,introduction){
        return axios.put(base.baseUrl+base.user.userInfo,{
            "username":username,
            "introduction":introduction,
        },{
            headers:{
                'Authorization':token,
            }
        })
    },
    getIdentification(){
        return axios.get(base.baseUrl+base.user.identification,{
            headers:{
                'Authorization':token,
            }
        })
    },
    addIdentification(identification){
        return axios.post(base.baseUrl+base.user.identification,identification,{
            headers:{
                'Authorization':token,
            }
        })
    },
    updateIdentification(identification){
        return axios.put(base.baseUrl+base.user.identification,identification,{
            headers:{
                'Authorization':token,
            }
        })
    },
    getAllIdentification(pageParams){
        return axios.post(base.baseUrl+base.admin.identification,pageParams,{
            headers:{
                'Authorization':token,
            }
        })
    },
    acceptIdentification(id){
        return axios.put(base.baseUrl+base.admin.acceptIdentification+"/"+id,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    refuseIdentification(id){
        return axios.put(base.baseUrl+base.admin.refuseIdentification+"/"+id,null,{
            headers:{
                'Authorization':token,
            }
        })
    },
    deleteCategory(categoryParam){
        return axios.post(base.baseUrl+base.admin.category+"/delete",categoryParam,{
            headers:{
                'Authorization':token,
            }
        })
    },
}

export default api;