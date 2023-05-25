const state = {
    cart: {
        data: [],
        dataClient: {
            fullName: '',
            email: '',
            phone: '',
            delivery: {
                type: 'courier'
            },
            address: {
                city: '',
                street: '',
                indexHouse: '',
                house: '',
                flat: '',
                entrance: '',
                floor: '',
                intercom: ''
            },
            payment: {
                type: 'online'
            }
        }
    },

}

const getters = {
    cart(state) {
        return state.cart.data
    },
    dataClient(state) {
        return state.cart.dataClient
    },
    countItems(state) {
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
        if (r - getters.totalPrice < 0) {
            return 0
        } else {
            return r - getters.totalPrice;
        }
    }
}
const mutations = {
    add(state, item) {
        let cart = state.cart.data;
        let simillar = cart.find((element) => { if (element.code === item.code) { return element } });
        if (simillar) {
            simillar.count++;
            localStorage.setItem('usercart', JSON.stringify(cart));
        } else {
            item.catalog_id = item.code;
            cart.push(item);
            state.cart.data = cart;
            localStorage.setItem('usercart', JSON.stringify(cart));
        }
    },
    countPlus(state, id) {
        let cart = state.cart.data;
        let sim = cart.find((element) => { if (element.code == id) { return element } });
        sim.count++;
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    countMinus(state, id) {
        let cart = state.cart.data;
        let sim = cart.find((element) => { if (element.code == id) { return element } })
        sim.count >= 1 ? sim.count-- : 0
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    update(state, item) {
        state.cart.data = item;
        localStorage.setItem('usercart', JSON.stringify(state.cart.data));
    },
    remove(state, item) {
        let cart = state.cart.data;
        let indexStorage = cart.find((element, index) => { if (element.code === item.code) { return index; } });
        cart.splice(indexStorage, 1);
        state.cart.data = cart;
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    removeAll(state) {
        let emptyArr = [];
        state.cart.data = emptyArr;
        localStorage.setItem('usercart', JSON.stringify(emptyArr));
    },
    updateDataClient(state, { name1, value, name2 }) {
        if (name2) {
            state.cart.dataClient[name1][name2] = value;
        } else {
            state.cart.dataClient[name1] = value;
        }
    }
}
const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}