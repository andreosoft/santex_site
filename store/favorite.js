const state = {
    favoriteData: {
        favoriteItems: []
    }
}

const getters = {
    favItems(state){
        return state.favoriteData.favoriteItems;
    },
    countItems(state) {
        const favdata = state.favoriteData.favoriteItems;
        let quantity = 0;
        favdata.forEach((element) => {
            quantity += element.count;
        })
        return quantity;
    },
}

const mutations = {
    addItem(state, item){
        const favdata = state.favoriteData.favoriteItems;
        const simillar = favdata.find((element) => { if (element.id === item.id) { return element } });
        if (simillar) {
            console.log('Такой товар уже есть в избранном');
            localStorage.setItem('favoriteItems', JSON.stringify(favdata));
            return;
        }
        favdata.push(item);
        state.favoriteData.favoriteItems = favdata;
        localStorage.setItem('favoriteItems', JSON.stringify(favdata));
    },
    update(state, item) {
        state.favoriteData.favoriteItems = item;
        localStorage.setItem('favoriteItems', JSON.stringify(state.favoriteData.favoriteItems));
    },
    removeAll(state) {
        const emptyArr = [];
        state.favoriteData.favoriteItems = emptyArr;
        localStorage.setItem('favoriteItems', JSON.stringify(emptyArr));
    },
    remove(state, item) {
        const favdata = state.favoriteData.favoriteItems;
        const indexStorage = favdata.find((element, index) => { if (element.code === item.code) { return index; } });
        favdata.splice(indexStorage, 1);
        state.favoriteData.favoriteItems = favdata;
        localStorage.setItem('favoriteItems', JSON.stringify(favdata));
    },
}

const actions = {

}

export default {
    state, getters, mutations, actions
}