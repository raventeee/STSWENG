$(document).ready(function() {
    $(".drop").change(function(){
        $(".drop").prop('disabled', true)
        console.log( $(this).parent().siblings(".tid").text());
        console.log($(this).val());
        //insert db edit here
    });
  });