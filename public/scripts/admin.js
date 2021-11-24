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
            customers += result[i].customerFirstName + " " + result[i].customerLastName + "<br>"
        }
        $('#content').html(customers)
    }



 

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

    

})