const hbsHelpers = {
  // used in cart page
  computeSubTotal: function (price, qty) {
    if (price < 0 || qty < 0) {
      return null;
    }
    return parseFloat(price * qty).toFixed(2);
  },

  // used in cart page for number of items
  countCartItems: function (cartItems) {
    return cartItems.length;
  },

  // used in cart page for rendering unit price
  convertFloat: function (price) {
    if (price < 0) {
      return null;
    }
    return parseFloat(price).toFixed(2);
  }
}

module.exports = hbsHelpers;
