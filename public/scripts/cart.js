$(document).ready(function () {
    let totalNumItems = 0 // total number of items
    let totalPrice = 0 // overall total price
    let isChanged = false // designates if the cart is edited

    let productsArr = [];

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
            totalPrice += parseFloat(subtotal)
        })
        $('#total-amount').text('PHP ' + parseFloat(totalPrice).toFixed(2));
    }

    /*
        [ADD/INCREASE BUTTON] This function updates the subtotal price of the product and the 
        overall total quantity and price in the cart.
    */
    $('.add_num').click(function () {
        // get quantity
        var quantity = $(this).prev().children().first().val()

        // Unit Price: PHP {{this.productPrice}}
        var unitpriceText = $(this).parent().next().text().split(" ")
        var unitprice = parseFloat(unitpriceText[3]).toFixed(2)

        var subtotal = parseFloat(unitprice * quantity).toFixed(2) // new subtotal price for this product
        // set the new subtotal
        $(this).parent().next().next().text("Subtotal Price: PHP " + subtotal)

        // update qty data for this product
        $(this).parent().next().next().next().data('qty', quantity)
        // updates total quantity in cart
        computeTotalItems()
        // update total price in cart
        computeTotalPrice()

        if (isChanged == false) {
            isChange = true
            $('#save_cart').prop('disabled', false)
            $('#edit_warning').text('You have unsaved changes in your cart!')
        }
    });

    /*
        [SUBTRACT/DECREASE BUTTON] This function updates the subtotal price of the product and the 
        overall total quantity and price in the cart.
    */
    $('.sub_num').click(function () {
        // get quantity
        var quantity = $(this).next().children().first().val()

        // Unit Price: PHP {{this.productPrice}}
        var unitpriceText = $(this).parent().next().text().split(" ")
        var unitprice = parseFloat(unitpriceText[3]).toFixed(2)

        var subtotal = parseFloat(unitprice * quantity).toFixed(2) // new subtotal price for this product
        // set the new subtotal
        $(this).parent().next().next().text("Subtotal Price: PHP " + subtotal)

        // update qty data for this product
        $(this).parent().next().next().next().data('qty', quantity)

        // updates total quantity in cart
        computeTotalItems()
        // update total price in cart
        computeTotalPrice()

        if (isChanged == false) {
            isChanged = true
            $('#save_cart').prop('disabled', false)
            $('#edit_warning').text('You have unsaved changes in your cart!')
        }
    });

    /*
        This function saves the contents of the cart to the database
    */
    $('#save_cart').click(function () {
        productsArr = []; // reset
        $('.product-item').each(function () {
            // data-productid and data-qty
            var productId = $(this).data('productid')
            var productQty = parseInt($(this).data('qty'))

            if (productQty > 0) {
                let product = {
                    productId: productId,
                    qty: productQty
                }
                productsArr.push(product)
            }
        })
        console.log(productsArr)
        productsArr = JSON.stringify(productsArr)

        const email = $('#current_user').data('email')
        const data = {
            productsArr: productsArr,
            customerEmail: email
        }
        console.log(data)
        $.ajax({
            type: 'POST',
            data: data,
            url: '/saveCart',
            success: function (result) {
                if (result) {
                    $('#cart_saved').modal('show')
                    setTimeout(function() {
                        $('#cart_saved').modal('hide');
                    }, 1500)
                } else {
                    $('#cart_not_saved').modal('show')
                    setTimeout(function() {
                        $('#cart_not_saved').modal('hide');
                    }, 1500)
                }
            }
        });
        $('#save_cart').prop('disabled', true)
        isChanged = false
        $('#edit_warning').text('')
    });

    /*
        This function deletes this product in the cart
    */
    $('.delete_product').click(function () {
        $(this).parent().parent().next().remove()
        $(this).parent().parent().remove()

        // updates total quantity in cart
        computeTotalItems()
        // update total price in cart
        computeTotalPrice()
        
        if (isChanged == false) {
            isChanged = true
            $('#save_cart').prop('disabled', false)
            $('#edit_warning').text('You have unsaved changes in your cart!')
        }
    });

    /* CHECKOUT PAGE FUNCTIONS */
    /*
        This function unchecks other radio button if gcash radio button is clicked
    */
    $('#gcash').click(function () {
        $('#bank_transfer').prop('checked', false)
        $('#paypal').prop('checked', false)
        $('#paymaya').prop('checked', false)
    });

    /*
        This function unchecks other radio button if bank_transfer radio button is clicked
    */
    $('#bank_transfer').click(function () {
        $('#gcash').prop('checked', false)
        $('#paypal').prop('checked', false)
        $('#paymaya').prop('checked', false)
    });

    /*
        This function unchecks other radio button if paypal radio button is clicked
    */
    $('#paypal').click(function () {
        $('#gcash').prop('checked', false)
        $('#bank_transfer').prop('checked', false)
        $('#paymaya').prop('checked', false)
    });

    /*
        This function unchecks other radio button if paypal radio button is clicked
    */
    $('#paymaya').click(function () {
        $('#gcash').prop('checked', false)
        $('#bank_transfer').prop('checked', false)
        $('#paypal').prop('checked', false)
    });

    
    /* CHECKOUT PAGE FUNCTIONS END */
    
    computeTotalItems() // call function to compute every page refresh
    computeTotalPrice() // call function to compute every page refresh
    $('#save_cart').prop('disabled', true)
});