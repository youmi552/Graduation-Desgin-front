import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/main/HomePage/Home.vue'
import Layout from '../views/Layout.vue'

const routes = [
  {
    path:"/",
    name:"Layout",
    component:Layout,  
    children:[
      {
        path: '', 
        name: 'Home',
        component: Home,
        meta:{
          isLogin:true
        },
        children:[
          {
            path: "",
            name: "Index",
            component:() => import("../views/main/HomePage/Index.vue"),
          },
          {
            path: "products",
            name: "Products",
            component:() => import("../views/main/HomePage/ProductsList.vue"),
          },
          {
            path:"/detail/:gid",
            name:"Detial",
            component:() => import("../views/main/HomePage/Detail.vue"),
          },
          {
            path:"/category/:cid",
            name:"category",
            component:() => import("../views/main/HomePage/Category.vue"),
          },
        ]
      },
      {
        path: 'product',
        name: 'Product',
        component:() => import("../views/main/Product.vue"),
        meta:{
          isLogin:true
        }
        
      },
      {
        path: 'advice',
        name: 'Advice',
        component:() => import("../views/main/Advice.vue"),
        meta:{
          isLogin:true
        }
      },
      {
        path: 'personal',
        name: 'Personal',
        component:() => import("../views/main/Personal/Personal.vue"),
        meta:{
          isLogin:true
        },
        children:[
          {
            path:"",
            name:"PersonalInfo",
            component:()=>import("../views/main/Personal/personInfo.vue")
          },
          {
            path:"cart",
            name:"Cart",
            component:()=>import("../views/main/Personal/cart.vue")
          },
          {
            path:"order",
            name:"Order",
            component:()=>import("../views/main/Personal/order.vue")
          },
          {
            path:"collection",
            name:"Collection",
            component:()=>import("../views/main/Personal/collect.vue")
          },
          {
            path:"history",
            name:"History",
            component:()=>import("../views/main/Personal/history.vue")
          },
          {
            path:"sell",
            name:"Sell",
            component:()=>import("../views/main/Personal/sell.vue")
          },
          {
            path:"orderDetail/:oid",
            name:"OrderDetail",
            component:()=>import("../views/main/Personal/OrderDetail.vue")
          }, 
        ]
      },
      {
        path: 'admin',
        name: 'Admin',
        component:() => import("../views/main/Admin/Admin.vue"),
        meta:{
          isLogin:true
        },
        children:[
          {
            path:"",
            name:"Data",
            component:()=>import("../views/main/Admin/Data.vue")
          },
          {
            path:"user",
            name:"User",
            component:()=>import("../views/main/Admin/User.vue")
          },
          {
            path:"product",
            name:"Product2",
            component:()=>import("../views/main/Admin/Product.vue")
          },
          {
            path:"detail/:gid",
            name:"AdDetial",
            component:() => import("../views/main/Admin/Detail.vue"),
          },
          {
            path:"category",
            name:"Categorys",
            component:()=>import("../views/main/Admin/Category.vue")
          },
          {
            path:"advice",
            name:"Advices",
            component:()=>import("../views/main/Admin/Advice.vue")
          },
          {
            path:"adviceDetail/:aid",
            name:"AdviceDetail",
            component:()=>import("../views/main/Admin/AdviceDetail.vue")
          },
          {
            path:"identification",
            name:"Identification",
            component:()=>import("../views/main/Admin/Identification.vue")
          }
          
        ]
      },
    ]
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import("../views/Login.vue")
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
