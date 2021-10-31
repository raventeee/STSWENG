$(document).ready(function () {
  $('#submitregister').click(function (event) {
    event.preventDefault()
    let data = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      address: $('#address').val(),
      mobile: $('#mobile').val(),
      gender: $('#gender').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      cart: [],
      customerTransactions: []
    }
    console.log('data in script:')
    console.log(data)

    $.ajax({
      type: 'POST',
      data: data,
      url: '/'
    })
  })
})