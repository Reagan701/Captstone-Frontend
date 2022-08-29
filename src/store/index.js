import { createStore } from 'vuex'

export default createStore({
  state: {
    user:null,
    currentUser: null,
    products: null,
    singleProduct: null
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setCurrentUser(state,currentUser){
      state.currentUser = currentUser;
    },
    setProducts(state,products){
      state.products = products;
    },
    setSingleProduct(state,product){
      state.singleProduct = product;
    }
  },
  actions: {
    getProducts(context){
      fetch('https://digiverseapi.herokuapp.com/products')
      .then((res)=>res.json())
      .then((data)=> {
        context.commit('setProducts',data.results);
      });
    },
    getSingleProduct(context,payload){
      fetch('https://digiverseapi.herokuapp.com/products/'+payload)
      .then((res)=>res.json())
      .then((data)=>context.commit('setSingleProduct', data.results[0]));
    },
    registerUser(context,payload){
      fetch('https://digiverseapi.herokuapp.com/users', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data));
    },
    loginUser(context,payload){
      fetch('https://digiverseapi.herokuapp.com/users', {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        context.commit('setUser', data.token);
        context.dispatch('verify');
      })
    },
    verify(context){
      fetch('https://digiverseapi.herokuapp.com/verify', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-auth-token': context.state.user
        }
      })
      .then((res) => res.json())
      .then((data)=> {
        context.commit('setCurrentUser', data.decodedUser.user)
      });
    }
  },
  modules: {
  }
})
