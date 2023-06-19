export default ({ store }) => {
  const data = localStorage.getItem('usercart');
  const dataFav = localStorage.getItem('favoriteItems');
  const dataCom = localStorage.getItem('compareItems');
  if (data) {
    let parsData;
    try {
      parsData = JSON.parse(data);
    } catch (error) {
      parsData = [];
    }
    store.commit('cart/update', parsData);
  }

  if(dataFav){
    let parsDataFav;
    try{
      parsDataFav = JSON.parse(dataFav);
    } catch (e){
      parsDataFav = [];
    }
    store.commit('favorite/update', parsDataFav);
  }

  if(dataCom){
    let parsDataCom;
    try {
      parsDataCom = JSON.parse(dataCom);
    } catch (e) {
      parsDataCom = [];
    }
    store.commit('compare/update', parsDataCom);
  }
}