export default ({ store }) => {
    const data = localStorage.getItem('usercart')
        if (data) {
          store.commit('cart/update', JSON.parse(data))
        }
  }
  