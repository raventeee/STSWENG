$(document).ready(function () {
  $('.add_cart').click(function () {
    // process here
    const email = $('#current_user').data('email')
    const productId = $(this).parent().attr('id')
    alert('clicked\n' + email + '\n' + productId)
    $.ajax({
      type: 'POST',
      data: {
        customerId: email,
        productId: productId,
        qty: 1 // by default 1
      },
      url: '/addCart'
    })
  })
})
