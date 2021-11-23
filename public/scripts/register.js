$(document).ready(function () {
    $('#first_name').blur(function(){
        var Fname = validator.trim($('#first_name').val());
        validateFname(Fname);
    })

    $('#last_name').blur(function(){
        var Lname = validator.trim($('#last_name').val());
        validateLname(Lname);
    })

    $("input[type=radio]").click(function () {
        //remove invalid classes
        if($('#maleGender').hasClass('is-invalid')){
            $('#maleGender').removeClass('is-invalid')
        }

        if($('#femaleGender').hasClass('is-invalid')){
            $('#femaleGender').removeClass('is-invalid')
        }

        if($('#otherGender').hasClass('is-invalid')){
            $('#otherGender').removeClass('is-invalid')
        }

        if($('#spacerGender').hasClass('is-invalid')){
            $('#spacerGender').removeClass('is-invalid')
        }

        //add valid classes
        if(!$('#maleGender').hasClass('is-valid')){
            $('#maleGender').addClass('is-valid');
        }

        if(!$('#femaleGender').hasClass('is-valid')){
            $('#femaleGender').addClass('is-valid');
        }

        if(!$('#otherGender').hasClass('is-valid')){
            $('#otherGender').addClass('is-valid');
        }

        if(!$('#spacerGender').hasClass('is-valid')){
            $('#spacerGender').addClass('is-valid');
        }        
    });

    $('#phone_number').blur(function(){
        var phoneNumber = validator.trim($('#phone_number').val());
        validatePhoneNumber(phoneNumber);
    })

    $("#phone_number").on('keypress', function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
            return false;

        return true
      })
    

    $('#email').blur(function(){
        var email = validator.trim($('#email').val());
        validateEmail(email);
    })

    $('#password').blur(function(){
        var password = validator.trim($('#password').val());
        validatePassword(password)
    })

    $('#confirm_password').blur(function(){
        var password = validator.trim($('#password').val());
        var confirm_pass = validator.trim($('#confirm_password').val());
        validateConfirmPassword(password, confirm_pass);
    })

    $('#register_btn').click(function () {
        var Fname = validator.trim($('#first_name').val());
        var Lname = validator.trim($('#last_name').val());
        var phoneNumber = validator.trim($('#phone_number').val());
        var email = validator.trim($('#email').val());
        var password = validator.trim($('#password').val());
        var confirm_pass = validator.trim($('#confirm_password').val());
        if (validateAllFields(Fname, Lname, phoneNumber, email, password, confirm_pass))
        {
            var gender = $('input[name="Gender"]:checked').val();
            Fname = Fname.charAt(0).toUpperCase() + Fname.slice(1)
            Lname = Lname.charAt(0).toUpperCase() + Lname.slice(1)
            phoneNumber = "+63" + phoneNumber
            let data = {
                firstName: Fname,
                lastName: Lname,
                address: "null",
                mobile: phoneNumber,
                gender: gender,
                email: email,
                password:password,
                cart: [],
                customerTransactions: []
                }
            $.ajax({
                type: 'POST',
                data: data,
                url: '/register',
                success: function (result) {
                    if (result) {
                    location.href = '/'
                    } else {
                    alert('err')
                    }
                }
                })
        }
        
    })

    $('#show_password').click(function () {
        showHidePassword();
    });

    $('#reset_btn').click(function () {
        resetFields();
    })

    function validateFname(Fname){
        var emptyFname = validator.isEmpty(Fname);
        var booleanFlag = true;

        if(emptyFname && !$('#first_name').hasClass('is-invalid')){
            if($('#first_name').hasClass('is-valid')){
                $('#first_name').removeClass('is-valid')
            }

            $('#fname-invalid').text('First name is empty!');
            $('#first_name').addClass('is-invalid')
            booleanFlag = false;
        }

        else if(!emptyFname){
            if($('#first_name').hasClass('is-invalid')){
                $('#first_name').removeClass('is-invalid')
            }
          
            if(!$('#first_name').hasClass('is-valid')){
                $('#first_name').addClass('is-valid')
            }
        }

        return booleanFlag
    }

    function validateLname(Lname){
        var emptyLname = validator.isEmpty(Lname);
        var booleanFlag = true;

        if(emptyLname && !$('#last_name').hasClass('is-invalid')){
            if($('#last_name').hasClass('is-valid')){
                $('#last_name').removeClass('is-valid')
            }

            $('#lname-invalid').text('Last name is empty!');
            $('#last_name').addClass('is-invalid')
            booleanFlag = false;
        }

        else if(!emptyLname){
            if($('#last_name').hasClass('is-invalid')){
                $('#last_name').removeClass('is-invalid')
            }
          
            if(!$('#last_name').hasClass('is-valid')){
                $('#last_name').addClass('is-valid')
            }
        }

        return booleanFlag
    }

    function validateGender(){
        //no selected gender
        if(!$("input[name='Gender']").is(':checked')){
            //remove invalid classes
            if($('#maleGender').hasClass('is-valid')){
                $('#maleGender').removeClass('is-valid')
            }

            if($('#femaleGender').hasClass('is-valid')){
                $('#femaleGender').removeClass('is-valid')
            }

            if($('#otherGender').hasClass('is-valid')){
                $('#otherGender').removeClass('is-valid')
            }

            if($('#spacerGender').hasClass('is-valid')){
                $('#spacerGender').removeClass('is-valid')
            }

            //add invalid classes
            if(!$('#maleGender').hasClass('is-invalid')){
                $('#maleGender').addClass('is-invalid');
            }

            if(!$('#femaleGender').hasClass('is-invalid')){
                $('#femaleGender').addClass('is-invalid');
            }

            if(!$('#otherGender').hasClass('is-invalid')){
                $('#otherGender').addClass('is-invalid');
            }

            if(!$('#spacerGender').hasClass('is-invalid')){
                $('#spacerGender').addClass('is-invalid');
            } 
            return false;
        }

        else{
            //remove invalid classes
            if($('#maleGender').hasClass('is-invalid')){
                $('#maleGender').removeClass('is-invalid')
            }

            if($('#femaleGender').hasClass('is-invalid')){
                $('#femaleGender').removeClass('is-invalid')
            }

            if($('#otherGender').hasClass('is-invalid')){
                $('#otherGender').removeClass('is-invalid')
            }

            if($('#spacerGender').hasClass('is-invalid')){
                $('#spacerGender').removeClass('is-invalid')
            }

            //add valid classes
            if(!$('#maleGender').hasClass('is-valid')){
                $('#maleGender').addClass('is-valid');
            }

            if(!$('#femaleGender').hasClass('is-valid')){
                $('#femaleGender').addClass('is-valid');
            }

            if(!$('#otherGender').hasClass('is-valid')){
                $('#otherGender').addClass('is-valid');
            }

            if(!$('#spacerGender').hasClass('is-valid')){
                $('#spacerGender').addClass('is-valid');
            }
            return true;
        }
    }

    function validatePhoneNumber(phoneNumber){
        booleanFlag = true
        if(phoneNumber.length < 10){
            if($('#phone_number').hasClass('is-valid')){
                $('#phone_number').removeClass('is-valid')
            }

            booleanFlag = false;
            $('#number-invalid').text('Phone number must be 10 digits');
            $('#phone_number').addClass('is-invalid')
            return booleanFlag;
        }

        else{
            var re =/^\d{10}$/
            var valid = re.test(phoneNumber)

            if(valid){
                if($('#phone_number').hasClass('is-invalid')){
                    $('#phone_number').removeClass('is-invalid')
                }
              
                if(!$('#phone_number').hasClass('is-valid')){
                    $('#phone_number').addClass('is-valid')
                }
                return booleanFlag
            }

            else{
                if($('#phone_number').hasClass('is-valid')){
                    $('#phone_number').removeClass('is-valid')
                }

                booleanFlag = false;
                $('#number-invalid').text('Invalid phone number!');
                $('#phone_number').addClass('is-invalid')
                return booleanFlag;
            }
        }
    }

    function validateEmail(email){
        var booleanFlag = true;
        var re = /^\S+@\S+\.\S+$/;
        var valid = re.test(email);
        var emptyEmail = validator.isEmpty(email);

        if(emptyEmail && !$('#email').hasClass('is-invalid')){
            if($('#email').hasClass('is-valid')){
                $('#email').removeClass('is-valid')
            }

            $('#email-invalid').text('Email is empty!');
            $('#email').addClass('is-invalid')
            booleanFlag = false;
        }

        else if(!emptyEmail){
            if(valid){
                if($('#email').hasClass('is-invalid')){
                    $('#email').removeClass('is-invalid')
                }
              
                if(!$('#email').hasClass('is-valid')){
                    $('#email').addClass('is-valid')
                }
            }

            else{
                if($('#email').hasClass('is-valid')){
                    $('#email').removeClass('is-valid')
                }
    
                $('#email-invalid').text('Invalid email!');
                $('#email').addClass('is-invalid')
                booleanFlag = false;
            }
        }
        return booleanFlag;
    }

    function validatePassword(password){
        var emptyPassword = validator.isEmpty(password);
        var booleanFlag = true;
        var valid = (password.length >= 6)

        if(emptyPassword && !$('#password').hasClass('is-invalid')){
            if($('#password').hasClass('is-valid')){
                $('#password').removeClass('is-valid')
            }

            $('#password-invalid').text('Password is empty!');
            $('#password').addClass('is-invalid')
            booleanFlag = false;
        }

        else if(!emptyPassword){
            if(valid){

                if($('#password').hasClass('is-invalid')){
                    $('#password').removeClass('is-invalid')
                }
              
                if(!$('#password').hasClass('is-valid')){
                    $('#password').addClass('is-valid')
                }
            }
            
            else{
                if($('#password').hasClass('is-valid')){
                    $('#password').removeClass('is-valid')
                }
    
                $('#password-invalid').text('Password must have at least 6 characters!');
                $('#password').addClass('is-invalid')
                booleanFlag = false;
            }
        }

        return booleanFlag
    }

    function validateConfirmPassword(password, confirm_pass){
        var emptyPassword = validator.isEmpty(confirm_pass);
        var booleanFlag = true;
        var valid = (confirm_pass === password);

        if(emptyPassword && !$('#confirm_password').hasClass('is-invalid')){
            if($('#confirm_password').hasClass('is-valid')){
                $('#confirm_password').removeClass('is-valid')
            }

            $('#password-invalid').text('Password is empty!');
            $('#confirm_password').addClass('is-invalid')
            booleanFlag = false;
        }

        else if(!emptyPassword){
            if(valid){

                if($('#confirm_password').hasClass('is-invalid')){
                    $('#confirm_password').removeClass('is-invalid')
                }
              
                if(!$('#confirm_password').hasClass('is-valid')){
                    $('#confirm_password').addClass('is-valid')
                }
            }
            
            else{
                if($('#confirm_password').hasClass('is-valid')){
                    $('#confirm_password').removeClass('is-valid')
                }
    
                $('#con-password-invalid').text('Password does not match!');
                $('#confirm_password').addClass('is-invalid')
                booleanFlag = false;
            }
        }
        return booleanFlag
    }

    function validateAllFields(Fname, Lname, phoneNumber, email, password, confirm_pass){
        var FnameFlag = validateFname(Fname)
        var LnameFlag = validateLname(Lname)
        var GenderFlag = validateGender();
        var phoneNumberFlag = validatePhoneNumber(phoneNumber)
        var emailFlag = validateEmail(email)
        var passwordFlag = validatePassword(password)
        var confirm_passFlag = validateConfirmPassword(password,confirm_pass)
        console.log('Fname: ' +  FnameFlag);
        console.log('Lname: ' +  LnameFlag);
        console.log('GenderFlag: ' +  GenderFlag);
        console.log('phoneNumberFlag: ' +  phoneNumberFlag);
        console.log('emailFlag: ' +  emailFlag);
        console.log('passwordFlag: ' +  passwordFlag);
        console.log('confirm_passFlag: ' +  confirm_passFlag);
        if (FnameFlag && LnameFlag && GenderFlag && phoneNumberFlag && emailFlag && passwordFlag && confirm_passFlag)
        {
            return true
        }
        else
        {
            return false
        }


        

    }

    function showHidePassword(){
        if($('#show_password').is(":checked")){
          $('#password').prop('type', 'text');
          $('#confirm_password').prop('type', 'text');
        }
    
        else{
          $('#password').prop('type', 'password');
          $('#confirm_password').prop('type', 'password');
        }
    }

    function resetFields(){
        if($('#first_name').hasClass('is-valid')){
            $('#first_name').removeClass('is-valid')
        }
        if($('#first_name').hasClass('is-invalid')){
            $('#first_name').removeClass('is-invalid')
        }

        if($('#last_name').hasClass('is-valid')){
            $('#last_name').removeClass('is-valid')
        }
        if($('#last_name').hasClass('is-invalid')){
            $('#last_name').removeClass('is-invalid')
        }

        if($('#maleGender').hasClass('is-valid')){
            $('#maleGender').removeClass('is-valid')
        }

        if($('#femaleGender').hasClass('is-valid')){
            $('#femaleGender').removeClass('is-valid')
        }

        if($('#otherGender').hasClass('is-valid')){
            $('#otherGender').removeClass('is-valid')
        }

        if($('#spacerGender').hasClass('is-valid')){
            $('#spacerGender').removeClass('is-valid')
        }

        if($('#maleGender').hasClass('is-invalid')){
            $('#maleGender').removeClass('is-invalid')
        }

        if($('#femaleGender').hasClass('is-invalid')){
            $('#femaleGender').removeClass('is-invalid')
        }

        if($('#otherGender').hasClass('is-invalid')){
            $('#otherGender').removeClass('is-invalid')
        }

        if($('#spacerGender').hasClass('is-invalid')){
            $('#spacerGender').removeClass('is-invalid')
        }

        if($('#phone_number').hasClass('is-invalid')){
            $('#phone_number').removeClass('is-invalid')
        }
        if($('#phone_number').hasClass('is-valid')){
            $('#phone_number').removeClass('is-valid')
        }

        if($('#email').hasClass('is-valid')){
            $('#email').removeClass('is-valid')
        }
        if($('#email').hasClass('is-invalid')){
            $('#email').removeClass('is-invalid')
        }

        if($('#password').hasClass('is-valid')){
            $('#password').removeClass('is-valid')
        }
        if($('#password').hasClass('is-invalid')){
            $('#password').removeClass('is-invalid')
        }

        if($('#confirm_password').hasClass('is-valid')){
            $('#confirm_password').removeClass('is-valid')
        }
        if($('#confirm_password').hasClass('is-invalid')){
            $('#confirm_password').removeClass('is-invalid')
        }
    
    }
})