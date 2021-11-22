$(document).ready(function () {
  $('#login').click(function () {
    let data = {
      email: String($('#input_email').val()),
      password: String($('#input_password').val())
    }
    $('#input_email').val('')
    $('#input_password').val('')

    $.ajax({
      type: 'POST',
      data: data,
      url: '/postLogin',
      success: function (result) {
        if (result) {
          location.href = '/'
        } else {
          alert('Invalid credentials')
        }
      }
    })
  })
})
