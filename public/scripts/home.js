$(document).ready(function () {
    $("#registerHere").click(function(){
        $("#loginModal").modal('hide');
    });

    $("#loginHere").click(function(){
        $("#registerModal").modal('hide');
    });

    $(".backToHome").click(function(){
        $("#registerModal").modal('hide');
        $("#loginModal").modal('hide');
    });

    $("#navHOME").on({
        mouseenter: function() {
            $("#2navHOME").css('color', 'black');
            $("#navHOME").css('background-color', '#FAF9F6');
            $("#navHOME").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navHOME").css('color', '#FAF9F6');
            $("#navHOME").css('background-color', '#292b2c');
        }
    });

    $("#navPS5").on({
        mouseenter: function() {
            $("#2navPS5").css('color', 'black');
            $("#navPS5").css('background-color', '#FAF9F6');
            $("#navPS5").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navPS5").css('color', '#FAF9F6');
            $("#navPS5").css('background-color', '#292b2c');
        }
    });

    $("#navPS4").on({
        mouseenter: function() {
            $("#2navPS4").css('color', 'black');
            $("#navPS4").css('background-color', '#FAF9F6');
            $("#navPS4").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navPS4").css('color', '#FAF9F6');
            $("#navPS4").css('background-color', '#292b2c');
        }
    });

    $("#navXBOX").on({
        mouseenter: function() {
            $("#2navXBOX").css('color', 'black');
            $("#navXBOX").css('background-color', '#FAF9F6');
            $("#navXBOX").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navXBOX").css('color', '#FAF9F6');
            $("#navXBOX").css('background-color', '#292b2c');
        }
    });

    $("#navNSW").on({
        mouseenter: function() {
            $("#2navNSW").css('color', 'black');
            $("#navNSW").css('background-color', '#FAF9F6');
            $("#navNSW").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navNSW").css('color', '#FAF9F6');
            $("#navNSW").css('background-color', '#292b2c');
        }
    });

    $("#navPCMAC").on({
        mouseenter: function() {
            $("#2navPCMAC").css('color', 'black');
            $("#navPCMAC").css('background-color', '#FAF9F6');
            $("#navPCMAC").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navPCMAC").css('color', '#FAF9F6');
            $("#navPCMAC").css('background-color', '#292b2c');
        }
    });

    $("#navORDERSTATUS").on({
        mouseenter: function() {
            $("#2navORDERSTATUS").css('color', 'black');
            $("#navORDERSTATUS").css('background-color', '#FAF9F6');
            $("#navORDERSTATUS").css('border-radius', '5px');
        },
        mouseleave: function() {
            $("#2navORDERSTATUS").css('color', '#FAF9F6');
            $("#navORDERSTATUS").css('background-color', '#292b2c');
        }
    });
})
  