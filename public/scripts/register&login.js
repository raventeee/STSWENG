//register function
const form = document.querySelector("#register")
form.addEventListener('submit', (e)=> {
  e.preventDefault(); //to not submit
  let data = {
    customerFirstName: String(form.firstName.value),
    customerLastName: String(form.lastName.value),
    customerAddress: String(form.address.value),
    customerMobile: String("+639"+form.mobile.value),
    customerGender: String(form.gender.value),
    customerEmail: String(form.email.value),
    customerPassword: String(form.password.value),
    customerCart: [],
    customerTransactions: []
  }
  console.log('data in script:')
  console.log(data)

  $.ajax({
    type: 'POST',
    data: data,
    url: '/'
  })
})
