$(document).ready(function () {



    /*

            address: result[i].customerAddress,
            cart: result[i].customerCart,
            email: result[i].customerEmail,
            firstName: result[i].customerFirstName,
            gender: result[i].customerGender,
            id: result[i].customerId,
            lastName: result[i].customerLastName,
            mobile: result[i].customerMobile,
            transactions: result[i].customerTransactions
    */
    function printNames(result)
    {
        let customers = ""
        for (i = 0; i < result.length; i++)
        {
            
            customers += result[i].customerFirstName + " " + result[i].customerLastName + "</br>"
        }
        $('#content').html("")
        $('#content').html(customers)
    }

    function printProducts(result)
    {
        let products = ""
        for (i = 0; i < result.length; i++)
        {
            
            if (result[i].productDiscounted == true)
            {
                discounted = "Undiscount this product"
                products += `<section>` + result[i].productName + " </section> <section>" + result[i].productDisprice + `</section> 
                <button id = "`+ result[i].productId + `" class = "UDbutton">`+discounted+`</button> <br><br>`
            }
            else
            {
                discounted = "Discount this product"
                products += `<section>`+ result[i].productName + " </section> <section>" + result[i].productPrice + `</section> 
                <button class = "Dbutton" id = "`+ result[i].productId + `">`+discounted+`</button> <input placeholder="Discount Percent" type="text" id="`+result[i].productId+ `" class = "Dprice"> <br><br>`
            }
        }
        $('#content').html("")
        $('#content').html(products)
    }

    function printTransactions(result)
    {
        let transactions = ""
        for (i = 0; i < result.length; i++)
        {
            transactions += result[i].account_num + " " + result[i].account_name + " " + result[i].totalTransactPrice + "<button class = 'Tbutton' id = '"+result[i].transactId+"'>Change Status</button>" +`
            <select class="TSelect" id="`+result[i].transactId+`">`
            if (result[i].orderStatus == "Payment Pending")
            {
                transactions +=`
                <option value="Payment Pending" selected>Payment Pending</option>
                <option value="Payment Successful">Payment Successful</option>
                <option value="To Be Shipped">To Be Shipped</option>
                <option value="On Transit">On Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>`+"<br>"
            }
            else if(result[i].orderStatus == "Payment Successful")
            {
                transactions +=`
                <option value="Payment Pending" >Payment Pending</option>
                <option value="Payment Successful" selected>Payment Successful</option>
                <option value="To Be Shipped">To Be Shipped</option>
                <option value="On Transit">On Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>`+"<br>"
            }
            else if(result[i].orderStatus == "To Be Shipped")
            {
                transactions +=`
                <option value="Payment Pending" >Payment Pending</option>
                <option value="Payment Successful" >Payment Successful</option>
                <option value="To Be Shipped" selected >To Be Shipped</option>
                <option value="On Transit">On Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>`+"<br>"
            }
            else if(result[i].orderStatus == "On Transit")
            {
                transactions +=`
                <option value="Payment Pending" >Payment Pending</option>
                <option value="Payment Successful" >Payment Successful</option>
                <option value="To Be Shipped"  >To Be Shipped</option>
                <option value="On Transit" selected>On Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>`+"<br>"
            }
            else if(result[i].orderStatus == "Delivered")
            {
                transactions +=`
                <option value="Payment Pending" >Payment Pending</option>
                <option value="Payment Successful" >Payment Successful</option>
                <option value="To Be Shipped"  >To Be Shipped</option>
                <option value="On Transit" >On Transit</option>
                <option value="Delivered" selected>Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>`+"<br>"
            }
            else if(result[i].orderStatus == "Cancelled")
            {
                transactions +=`
                <option value="Payment Pending">Payment Pending</option>
                <option value="Payment Successful">Payment Successful</option>
                <option value="To Be Shipped">To Be Shipped</option>
                <option value="On Transit">On Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled" selected>Cancelled</option>
                </select>`+"<br>"
            }
        }
        $('#content').html("")
        $('#content').html(transactions)
    }


    $('#content').on('click', '.Tbutton', function () {
        var transactId = $(this).attr('id')
        var newStatus = $(this).next().val()
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
                    $('#button3').click()
                }
            }
        })
        
    })

    $('#content').on('click', '.Dbutton', function () {
        var product_id = $(this).attr('id')
        var price = parseFloat($(this).prev().html())
        var percent =parseFloat($(this).next().val())/100.0
        var totalprice = (1.0-percent) * price
        const data = {
            productId: product_id,
            productDisprice: totalprice,
            productDiscounted: true
        }
        $.ajax({
            type: 'POST',   
            data: data,
            url: '/postDiscountItem',
            success:function(result)
            {
                if (result == true)
                {
                    $('#button2').click()
                }
            }
        })
    })



    $('#button1').click(function()
    {
        $.ajax({
            type: 'POST',
            data: null,
            url: '/postAllCustomers',
            success: function(result)
            {
                printNames(result)
            }
        })
    })

    $('#button2').click(function()
    {
        $.ajax({
            type: 'POST',
            data: null,
            url: '/postAllProducts',
            success: function(result)
            {
                printProducts(result)
            }
        })
    })

    $('#button3').click(function()
    {
        $.ajax({
            type: 'POST',
            data: null,
            url: '/postAllTransactions',
            success: function(result)
            {
                printTransactions(result)
            }
        })
    })


    $('#content').on('click', '.UDbutton', function () {
        var product_id = $(this).attr('id')
        var price = 0
        const data = {
            productId: product_id,
            productDisprice: price,
            productDiscounted: ""
        }
        $.ajax({
            type: 'POST',   
            data: data,
            url: '/postDiscountItem',
            success:function(result)
            {
                if (result == true)
                {
                    $('#button2').click()
                }
            }
        })
    })



    $('#add_product').click(function () {
        const data = {
            productBrand: 'testBrand',
            productCategory: 'testcat',
            productDesc: 'testdesc',
            productName: 'testname',
            productPrice: 1000,
            productStock: 120
        }
        $.ajax({
            type: 'POST',
            data: data,
            url: '/postAddProduct',
            success: function (result) {
                if (result) {
                    alert('Success')
                }
            }
        })
    })

})