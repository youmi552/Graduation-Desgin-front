const base={
    baseUrl:"http://localhost:80",
    common:{
        register:"/common/register",
        login:"/common/login",
        loginByPhoneNumber:"/common/login/p"
    },
    user:{
        Product:"/user/goods",
        getProducts:"/user/goods/goodsdata",
        getProductsByCategory:"/user/goods/goodsdata/category",
        addPicture:"/user/goods/picture",
        getCategorys:"/user/category",
        getQuestionCategorys:"/user/advice/category",
        collection:"/user/goods/collection",
        cart:"/user/cart",
        advice:"/user/advice",
        addPhoto:"/user/advice/photo",
        history:"/user/history",
        collection:"/user/collection",
        order:"/user/order",
        orderDetail:"/user/order/detail",
        sell:"/user/order/sell",
        avatar:"/user/userInfo/avatar",
        userInfo:"/user/userInfo",
        identification:"/user/identification",
    },
    admin:{
        data:"/admin/data",
        userData:"/admin/data/user",
        category:"/admin/category",
        advice:"/admin/advice",
        adviceDetail:"/admin/advice/detail",
        allow:"/admin/goods/allow",
        ban:"/admin/goods/ban",
        goods:"/admin/goods",
        identification:"/admin/identification",
        acceptIdentification:"/admin/identification/accept",
        refuseIdentification:"/admin/identification/refuse",
    }
}


export default base;
