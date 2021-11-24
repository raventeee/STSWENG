const db = require('../db')
const product = require('../models/product')
const customer = require('../models/customer')
const cartProd = require('../models/cartProd')


const adminController = {
    getAdminLogin: (req, res) => {
        const data = 
        {
            scripts:['admin']
        }
        if(db.getAuth.currentUser != null)
        {
            const email = db.getAuth.currentUser.email
            db.getAll('Admin',function(adminresult){
            let flag = false
            if (adminresult !== null)
            {
                let i = 0
                while (!flag && (i < adminresult.length)){
                    if (email === adminresult[i].customerEmail)
                    {
                        flag = true
                    }
                    i++
                }
                if (flag)
                {
                    res.render('admin', data)
                }
                else
                {
                    res.redirect('/error')
                }
            }    
        })
        }
        else
        {
            res.redirect('/error')
        }
    },



    postAllCustomers: (req,res) => {
        const data = req.body

        db.getAll('Customers',function(result){
            let i = 0
            if (result !== null)
            {
                console.log(result)
                res.send(result)
            }
           
        })
    }

}


module.exports = adminController