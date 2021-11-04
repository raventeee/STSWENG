$(document).ready(function () {
  $('#submitregister').click(function (event) {
    event.preventDefault()
    let data = {
      firstName: String($('#firstName').val()),
      lastName: String($('#lastName').val()),
      address: String($('#address').val()),
      mobile: String($('#mobile').val()),
      gender: String($('#gender').val()),
      email: String($('#email').val()),
      password: String($('#password').val()),
      cart: [],
      customerTransactions: []
    }
    $('#firstName').val("") 
    $('#lastName').val("") 
    $('#address').val("")
    $('#mobile').val("") 
    $('#gender').val("")
    $('#email').val("") 
    $('#password').val("")
    $('#regstatus').html("register status: Registered!")
    $.ajax({
      type: 'POST',
      data: data,
      url: '/register'
    })
  })

  $('#submitlogin').click(function (event){
    event.preventDefault()
    let data = {
      email: String($('#logemail').val()),
      password: String($('#logpassword').val())
    }
    $('#logemail').val("")
    $('#logpassword').val("")
    $.ajax({
      type: 'POST',
      data: data,
      url: '/login'
    })
  })
})

