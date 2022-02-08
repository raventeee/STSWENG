$(document).ready(function () {
    $('.add-discount').click(function () {
        $('#product_id').html($(this).data('id'));
        $('#product_name').html($(this).data('name'));
        $('#product_price').html($(this).data('price'));

    });


    $('.remove-discount').click(function () {
        $(this).addClass('visually-hidden');
        $(this).siblings('.add-discount').removeClass('visually-hidden');
        //Put message in toast box (successful/fail)
        $('#toast-body').html('Discount Removed!')
        showToast();
        
    });

    $('#submit-discount-btn').click(function () {
        var price = 2000;
        var id = $('#product_id').text();
        var element = document.getElementById(id);
        $(element).children(".pButtons").children('.add-discount').addClass('visually-hidden');
        $(element).children(".pButtons").children('.remove-discount').removeClass('visually-hidden');
        $(element).children(".pPrice").html(price)
        //Put message in toast box (successful/fail)
        $('#toast-body').html('Discount Implemented!')
        showToast();

    });


});