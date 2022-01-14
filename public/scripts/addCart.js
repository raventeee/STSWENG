$(document).ready(function () {
  $('.add_cart').click(function () {
    // process here
    const email = $('#current_user').data('email');
    const productId = $(this).parent().attr('id');
    $.ajax({
      type: 'POST',
      data: {
        customerId: email,
        productId: productId,
        qty: 1 // by default 1
      },
      url: '/addCart',
      success: function (result) {
        if (result === false) {
          $("#loginModal").modal('show');
        } else {
          $('#cart_success').modal('show');
          setTimeout(function() {
            $('#cart_success').modal('hide');
          }, 1500);
        }
      }
    });
  });
})
