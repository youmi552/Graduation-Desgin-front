export default{
    namespaced:true,
    state:{
        user:{
            token:"",
            userInfo:{
                username:"",
                uid:"",
                avatar:"",
                level:"",
                introduction:"", 
            }
          }
    },
    mutations:{
        setUser(state,data){
            state.user.token=data.data.token;
            state.user.userInfo=data.data.userInfo
        },
        removeUser(state) {
            state.user = {
                userInfo:{
                    username:"",
                    uid:"",
                    avatar:"",
                    level:"",
                    introduction:"", 
                },
                token: "",
            }
        }
    }
}