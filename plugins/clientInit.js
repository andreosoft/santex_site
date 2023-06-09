export default ({ store }) => {
  const data = localStorage.getItem('usercart');
  const dataFav = localStorage.getItem('favoriteItems');
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
}