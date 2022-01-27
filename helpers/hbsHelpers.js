const hbsHelpers = {
  // used in cart page
  computeSubTotal: function (price, qty) {
    if (price < 0) {
      return null
    }
    if (qty < 0) {
      return null
    }
    return price * qty;
  },

  // used in cart page for number of items
  countCartItems: function (cartItems) {
    return cartItems.length;
  }
}

module.exports = hbsHelpers;
