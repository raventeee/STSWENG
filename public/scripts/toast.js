var option = {
    animation: true,
    delay: 2000
};

var toast = document.getElementById("toast");
var toast2 = document.getElementById("toast2");
var toastElement = new bootstrap.Toast(toast, option);
var toastElement2 = new bootstrap.Toast(toast2, option);
toastElement.show();



console.log("show toast")