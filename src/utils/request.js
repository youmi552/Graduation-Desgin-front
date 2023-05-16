import axios from "axios"
import qs from "querystring"
import router from "../router"
import store from "../store"

const toLogin = () =>{
    router.push("/login")
}

const errorHandle = (status,info) =>{
    switch(status){
        case 400:
            console.log("服务器收到客户端通过PUT或者POST请求提交的表示，表示的格式正确，但服务器不懂它什么意思");
            toLogin();
            break;
        case 401:
            console.log("客户端试图对一个受保护的资源进行操作，却又没有提供正确的认证证书");
            toLogin();
            break;
        case 403:
            console.log("客户端请求的结构正确，但是服务器不想处理它");
            toLogin();
            break;
        case 404:
            console.log("资源被围定义(网络请求地址错误)");
            break;
        case 500:
            console.log("执行请求处理代码时遇到了异常，它们就发送此响应代码");
            break;
        case 503:
            console.log("最可能的原因是资源不足：服务器突然收到太多请求，以至于无法全部处理");
            break;
        default:
            console.log(info);
            break;
    }
}

const instance = axios.create({
    timeout:5000
})

instance.all = axios.all;
instance.spread = axios.spread
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(
    config =>{
        if(config.method === 'post'){
            config.data = qs.stringify(config.data);
        }
        // 判断token是否存在，存在就添加到请求头上
        // const token = store.state.loginModule.user.token;
        // if(token){
        //     config.headers.authorization = store.state.loginModule.user.token;
        // }
        return config;
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response) ,
    error =>{
        const { response } = error;
        if(response){
            errorHandle(response.status,response.data);
            return Promise.reject(response);
        }else{
            console.log("请求被中断");
        }
    }
)

export function get(url,params){
    return new Promise((resolve,reject) =>{
        instance.get(url,{
            params
        }).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    })
}

export function post(url,params){
    return new Promise((resolve,reject) =>{
        instance.post(url,params).then(res =>{
            resolve(res.data)
        }).catch(err =>{
            reject(err.data)
        })
    })
}

export default instance