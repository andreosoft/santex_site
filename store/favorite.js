const state = {
    favoriteData: {
        favoriteItems: [],
        data_result: ''
    }
}

const getters = {
    favItems(state){
        return state.favoriteData.favoriteItems;
    },
    countItems(state) {
        const favdata = state.favoriteData.favoriteItems;
        return favdata.length;
    },
    dataResult(state){
        return state.favoriteData.data_result;
    }
}

const mutations = {
    addItem(state, item){
        const favdata = state.favoriteData.favoriteItems;
        const simillar = favdata.find((element) => { if (element.id === item.id) { return element } });
        if (simillar) {
            state.favoriteData.data_result = 'Такой товар уже есть в избранном';
            console.log('Такой товар уже есть в избранном');
            localStorage.setItem('favoriteItems', JSON.stringify(favdata));
            return;
        }
        favdata.push(item);
        state.favoriteData.data_result = 'Товар добавлен в избранное';
        console.log('Товар добавлен в избранное');
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
        state.favoriteData.data_result = 'Избранное очищено';
        localStorage.setItem('favoriteItems', JSON.stringify(emptyArr));
    },
    remove(state, item) {
        const favdata = state.favoriteData.favoriteItems;
        let indexStorage; 
        favdata.forEach((element, index) => { if (element.id === item.id) { indexStorage = index; } });
        favdata.splice(indexStorage, 1);
        state.favoriteData.favoriteItems = favdata;
        state.favoriteData.data_result = 'Товар удален из избранного';
        localStorage.setItem('favoriteItems', JSON.stringify(favdata));
    },
    checkAvailability(state, item){
        const favdata = state.favoriteData.favoriteItems;
        const simillar = favdata.find((element) => { if (element.id === item.id) { return element } });
        if (simillar) {
            state.favoriteData.data_result = 'Такой товар уже есть в избранном';
            return true;
        } else {
            return false;
        }
    }
}

const actions = {

}

export default {
    state, getters, mutations, actions
}