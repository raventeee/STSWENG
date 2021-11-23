$(document).ready(function () {




    function printNames(result)
    {
        let customers = ""
        for (i = 0; i < result.length; i++)
        {
            customers += result[i].firstName + " " + result[i].lastName + "<br>"
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