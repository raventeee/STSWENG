const hbsHelpers = {
  // used in cart page
  computeSubTotal: function (price, qty) {
    if (price < 0 || qty < 0) {
      return null;
    }
    return parseFloat(price * qty).toFixed(2);
  },

  // used in cart page for number of items
  isCartEmpty: function (cartItems) {
    return cartItems.length == 0;
  },

  // used in cart page for rendering unit price
  convertFloat: function (price) {
    if (price < 0) {
      return null;
    }
    return parseFloat(price).toFixed(2);
  },

  isPaymentPending: function (status) {
    return status == 'Payment Pending'
  },

  isPaymentSuccessful: function (status) {
    return status == 'Payment Successful'
  },

  isToBeShipped: function (status) {
    return status == 'To Be Shipped'
  },

  isOnTransit: function (status) {
    return status == 'On Transit'
  },

  isDelivered: function (status) {
    return status == 'Delivered'
  }
}

module.exports = hbsHelpers;
