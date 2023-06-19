const state = {
    compareData: {
        items: []
    }
}

const getters = {
    compareData(state){
        return state.compareData.items;
    },
    countItems(state) {
        const compareData = state.compareData.items;
        return compareData.length;
    },
}

const mutations = {
    removeAll(state) {
        const emptyArr = [];
        state.compareData.items = emptyArr;
        localStorage.setItem('compareItems', JSON.stringify(emptyArr));
    },
    remove(state, item) {
        const compareData = state.compareData.items;
        const indexStorage = compareData.find((element, index) => { if (element.id === item.id) { return index; } });
        compareData.splice(indexStorage, 1);
        state.compareData.items = compareData;
        localStorage.setItem('compareItems', JSON.stringify(compareData));
    },
    update(state, item) {
        state.compareData.items = item;
        localStorage.setItem('compareItems', JSON.stringify(state.compareData.items));
    },
    addItem(state, item){
        const compareData = state.compareData.items;
        const simillar = compareData.find((element) => { if (element.id === item.id) { return element } });
        if (simillar) {
            console.log('Такой товар уже есть в сравнении');
            localStorage.setItem('compareItems', JSON.stringify(compareData));
            return;
        }
        compareData.push(item);
        state.compareData.items = compareData;
        localStorage.setItem('compareItems', JSON.stringify(compareData));
    },
}

const actions = {

}

export default {
    state, getters, mutations, actions
}