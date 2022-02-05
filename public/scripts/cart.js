$(document).ready(function () {
    let totalNumItems = 0 // total number of items
    let totalPrice = 0

    function computeTotalItems () {
        totalNumItems = 0;
        $('.cartAllQty').each(function () {
            totalNumItems += parseInt($(this).val())
        })
        $('#number-of-items').text(parseInt(totalNumItems) + ' items')
    }

    function computeTotalPrice () {
        totalPrice = 0
        $('.subtotal').each(function () {
            let arr = $(this).text().split(" ")
            let subtotal = arr[3]
            totalPrice += parseInt(subtotal)
        })
        $('#total-amount').text('PHP ' + parseInt(totalPrice));
    }

    $('.add_num').click(function () {
        totalNumItems = 0;
        $('.cartAllQty').each(function () {
            totalNumItems += parseInt($(this).val())
        })
        $('#number-of-items').text(parseInt(totalNumItems) + ' items')
    });

    $('.sub_num').click(function () {
        totalNumItems = 0;
        $('.cartAllQty').each(function () {
            totalNumItems += parseInt($(this).val())
        })
        $('#number-of-items').text(parseInt(totalNumItems) + ' items')
    });

    computeTotalItems() // call function to compute every page refresh
    computeTotalPrice() // call function to compute every page refresh
});