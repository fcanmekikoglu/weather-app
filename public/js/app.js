const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()  //prevent refresh

    const location = search.value
       
    messageOne.textContent='Searching weather forecast for ' + `'${location}'`
    messageTwo.textContent=''

    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = `${data.forecast.description} with the temp of ${data.forecast.temp} celsius but it feels like ${data.forecast.feelstemp} degrees with ${data.forecast.humidity}% humidity. `
            }
        })
    })   
})

