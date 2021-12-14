var option = {
    animation: true,
    delay: 1500
};

var toast = document.getElementById("toast");
var toast2 = document.getElementById("toast2");
var toastElement = new bootstrap.Toast(toast, option);
var toastElement2 = new bootstrap.Toast(toast2, option);
toastElement.show();

toast.addEventListener('hidden.bs.toast', function () {
    var elem = document.getElementById('toast-container');
    elem.style.visibility = 'hidden';
  })

console.log("show toast")