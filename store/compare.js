const state = {
    compareData: {
        items: [],
        data_result: ''
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
    dataResult(state){
        return state.compareData.data_result;
    }
}

const mutations = {
    removeAll(state) {
        const emptyArr = [];
        state.compareData.items = emptyArr;
        state.compareData.data_result = 'Сравнение очищено';
        localStorage.setItem('compareItems', JSON.stringify(emptyArr));
    },
    remove(state, item) {
        const compareData = state.compareData.items;
        let indexStorage;
        compareData.forEach((element, index) => { if (element.id === item.id) { indexStorage = index; } });
        compareData.splice(indexStorage, 1);
        state.compareData.items = compareData;
        state.compareData.data_result = 'Товар удален из сравнения';
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
            state.compareData.data_result = 'Такой товар уже есть в сравнении';
            console.log('Такой товар уже есть в сравнении');
            localStorage.setItem('compareItems', JSON.stringify(compareData));
            return;
        }
        compareData.push(item);
        state.compareData.data_result = 'Товар добавлен в сравнение';
        state.compareData.items = compareData;
        localStorage.setItem('compareItems', JSON.stringify(compareData));
    },
}

const actions = {

}

export default {
    state, getters, mutations, actions
}