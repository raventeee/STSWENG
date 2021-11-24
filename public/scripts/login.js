$(document).ready(function () {

  function validateFields (email, password)  {
    var valid = true
    if (validator.isEmpty(email)) {
      valid = false
      if (!$('#input_email').hasClass('is-invalid')) {
        $('#input_email').addClass('is-invalid')
      }
    } else {
      if ($('#input_email').hasClass('is-invalid')) {
        $('#input_email').removeClass('is-invalid')
      }
    }

    if (validator.isEmpty(password)) {
      valid = false
      if (!$('#input_password').hasClass('is-invalid')) {
        $('#input_password').addClass('is-invalid')
      }
    } else {
      if ($('#input_password').hasClass('is-invalid')) {
        $('#input_password').removeClass('is-invalid')
      }
    }

    return valid
  }

  $('#login').click(function () {
    // get the values
    const email = validator.trim($('#input_email').val())
    const password = validator.trim($('#input_password').val())

    if (validateFields(email, password)) {
      let data = {
        email: email,
        password: password
      }
      $('#input_email').val('')
      $('#input_password').val('')
  
      $.ajax({
        type: 'POST',
        data: data,
        url: '/postLogin',
        success: function (result) {
          if (result == '1') {
            location.href = '/'
          }
          else if (result == '0')
          {
            location.href = '/admin'
          } else {
            alert('Invalid credentials')
            // remove class is-invalid if exists
            if ($('#input_email').hasClass('is-invalid')) {
              $('#input_email').removeClass('is-invalid')
            }
            if ($('#input_password').hasClass('is-invalid')) {
              $('#input_password').removeClass('is-invalid')
            }
          }
        }
      })
    }
  })

  $('#loginBtn').click(function(){
    resetFields();
  })

  function resetFields(){
    if($('#input_email').hasClass('is-valid')){
        $('#input_email').removeClass('is-valid')
    }

    if($('#input_email').hasClass('is-invalid')){
        $('#input_email').removeClass('is-invalid')
    }

    if($('#input_password').hasClass('is-valid')){
        $('#input_password').removeClass('is-valid')
    }
    if($('#input_password').hasClass('is-invalid')){
        $('#input_password').removeClass('is-invalid')
    }

    $('#input_email').val('')
    $('#input_password').val('')

  }
})
