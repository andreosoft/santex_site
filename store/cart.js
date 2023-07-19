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
        },
        data_result: '',
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
        const cart = state.cart.data;
        let quantity = 0;
        cart.forEach((element) => {
            quantity += element.count;
        })
        return quantity;
    },
    totalPrice(state) {
        const cart = state.cart.data;
        let r = 0;
        for (const el of cart) {
            r += el.price * el.count;
        }
        return r;
    },
    totalDiscount(state, getters) {
        const cart = state.cart.data;
        let r = 0;
        for (const el of cart) {
            r += el.old_price * el.count;
        }
        return r - getters.totalPrice < 0 ? 0 : r - getters.totalPrice;
    },
    dataResult(state){
        return state.cart.data_result;
    }
}
const mutations = {
    add(state, item) {
        const cart = state.cart.data;
        const simillar = cart.find((element) => { if (element.code === item.code) { return element } });
        if (simillar) {
            simillar.count++;
            localStorage.setItem('usercart', JSON.stringify(cart));
            state.cart.data_result = 'Товар уже есть в корзине';
            return;
        }
        item.catalog_id = item.code;
        cart.push(item);
        state.cart.data_result = 'Товар добавлен в корзину';
        state.cart.data = cart;
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    countPlus(state, id) {
        const cart = state.cart.data;
        const sim = cart.find((element) => { if (element.code == id) { return element } });
        sim.count++;
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    countMinus(state, id) {
        const cart = state.cart.data;
        const sim = cart.find((element) => { if (element.code == id) { return element } })
        if (sim.count >= 2) {
            sim.count--;
        }
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    update(state, item) {
        state.cart.data = item;
        localStorage.setItem('usercart', JSON.stringify(state.cart.data));
    },
    remove(state, item) {
        const cart = state.cart.data;
        let indexStorage;
        cart.forEach((element, index) => { if (element.code === item.code) { indexStorage = index; } });
        cart.splice(indexStorage, 1);
        state.cart.data = cart;
        state.cart.data_result = 'Товар удален из корзины';
        localStorage.setItem('usercart', JSON.stringify(cart));
    },
    removeAll(state) {
        const emptyArr = [];
        state.cart.data = emptyArr;
        state.cart.data_result = 'Корзина очищена';
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