$(document).ready(function() {
    $(".drop").change(function(){
        var transactId =  $(this).parent().siblings(".tid").text()
        var newStatus = $(this).val()
        const data = {
            transactId: transactId,
            orderStatus: newStatus
        }
        $.ajax({
            type: 'POST',
            data: data,
            url: '/updateStatus',
            success:function(result)
            {
                if (result == true)
                {
                    $('#toast-body').html('Status Updated!')
                    showToast();
                }
            }
        })



    });
  });