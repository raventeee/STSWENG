$(document).ready(function () {
  $('#submitregister').click(function (event) {
    event.preventDefault()

    let firstName = String($('#firstName').val())
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    let lastName = String($('#lastName').val())
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    let data = {
      firstName: firstName,
      lastName: lastName,
      address: String($('#address').val()),
      mobile: String($('#mobile').val()),
      gender: String($('#gender').val()),
      email: String($('#email').val()),
      password: String($('#password').val()),
      cart: [],
      customerTransactions: []
    }
    $('#firstName').val('')
    $('#lastName').val('')
    $('#address').val('')
    $('#mobile').val('')
    $('#gender').val('')
    $('#email').val('')
    $('#password').val('')
    $('#regstatus').html('register status: Registered!')
    $.ajax({
      type: 'POST',
      data: data,
      url: '/register',
      success: function (result) {
        if (result) {
          location.href = '/home'
        } else {
          alert('err')
        }
      }
    })
  })

  $('#submitlogin').click(function (event) {
    event.preventDefault()
    let data = {
      email: String($('#logemail').val()),
      password: String($('#logpassword').val())
    }
    $('#logemail').val('')
    $('#logpassword').val('')
    $.ajax({
      type: 'POST',
      data: data,
      url: '/login',
      success: function (result) {
        console.log(result)
        if (result) {
          alert(result)
          location.href = '/home'
        } else {
          alert('err')
        }
      }
    })
  })
})
