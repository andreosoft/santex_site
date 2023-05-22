export default ({ store }) => {
  const data = localStorage.getItem('usercart')
  if (data) {
    let parsData;
    try {
      parsData = JSON.parse(data);
    } catch (error) {
      parsData = []
    }
    store.commit('cart/update', parsData);
  }
}