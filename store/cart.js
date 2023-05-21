const state = {
    cart: {
        data: []
    }
}

const getters = {
    cart(state) {
        return state.cart.data
    },
    // cartData() {
    //     if (process.client) {
    //         try {
    //             return JSON.stringify(localStorage.getItem('cart-data'))
    //         } catch (error) {
    //             return {}
    //         }
    //     }
    // },
    countItems(state){
        let cart = state.cart.data;
        let quantity = cart.length;
        return quantity;
    },
    totalPrice(state) {
        let cart = state.cart.data;
        let r = 0;
        for (const el of cart) {
            r = r + (el.price * el.count);
        }
        return r;
    },
    totalDiscount(state, getters) {
        let cart = state.cart.data;
        let r = 0;
        for (const el of cart) {
            r = r + (el.old_price * el.count);
        }
        if(r-getters.totalPrice < 0){
            return 0
        } else {
            return r - getters.totalPrice;
        }
    }
    // totalDiscont() {
    //     let r = 0;
    //     for (const el of this.mass) {
    //         r = r + (el.old_price * el.count);
    //     }
    //     if(r-this.totalPrice < 0){
    //         return 0
    //     } else {
    //         return r - this.totalPrice;
    //     }
    // }
}
const mutations = {
    add(state, item){
        let cart = state.cart.data;
        let simillar = cart.find((element) => {if(element.code === item.code){return element}});
        if(simillar){
          simillar.count++;
          localStorage.setItem('usercart', JSON.stringify(cart));
        } else {
          cart.push(item);
          state.cart.data = cart;
          localStorage.setItem('usercart', JSON.stringify(cart));
        }
    },
    update (state, item){
        state.cart.data = item;
        // console.log('Значение обновлено');
        // console.log(state.cart.data);
        localStorage.setItem('usercart', JSON.stringify(state.cart.data));
      },
    remove(state, item){
        let cart = state.cart.data;
        let indexStorage = cart.find((element, index) => {if(element.code === item.code){return index;}});
        cart.splice(indexStorage, 1);
        state.cart.data = cart;
        localStorage.setItem('usercart', JSON.stringify(cart));
        // let indexMass = this.mass.find((element, index) => {if(element.code === item.code){return index;}});
        // this.mass.splice(indexMass, 1);
    },
    removeAll(state){
        let emptyArr = [];
        state.cart.data = emptyArr;
        localStorage.setItem('usercart', JSON.stringify(emptyArr));
    }
}
const actions = {
    
}

export default{
    state,
    getters,
    mutations,
    actions
}