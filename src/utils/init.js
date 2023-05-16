import  store from "../store"

if(localStorage.getItem("ego")){
    store.commit("login/setUser",JSON.parse(localStorage.getItem("ego")))
}