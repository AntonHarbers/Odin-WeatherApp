const endpoint = 'http://api.weatherapi.com/v1'
const apiKey = '6c5d19286ef047d387d103759230108'
let city = 'London'

const conditionImg = document.querySelector('#conditionImg')
const cityText = document.querySelector('#city')
const countryText = document.querySelector('#country')
const tempText = document.querySelector('#temp')
const conditionText = document.querySelector('#condition')

let isCelcius = true;
const celciusCheckbox = document.querySelector('#checkbox')
const celciusCheckboxLabel = document.querySelector('#checkboxLabel')

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    city = e.target[0].value;

    getWeather();
})

celciusCheckbox.addEventListener('change', () => {
    isCelcius = !isCelcius;
    if(isCelcius){
        celciusCheckboxLabel.innerHTML = '°C'
    }else{
        celciusCheckboxLabel.innerHTML = '°F'
    }
    getWeather()
})

const getWeather = async () => {
    // create loading spinner
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')
    document.body.appendChild(spinner)

    try{
        const response = await fetch(`${endpoint}/current.json?key=${apiKey}&q=${city}`)
        const data = await response.json()
        console.log(data)
    
        conditionImg.src = await data.current.condition.icon;
        cityText.innerHTML = await data.location.name;
        countryText.innerHTML = await data.location.country;
        if(isCelcius){
            tempText.innerHTML = await data.current.temp_c + '°C';
        }else{
            tempText.innerHTML = await data.current.temp_f + '°F';
        }
        conditionText.innerHTML = await data.current.condition.text;
    }catch(e){
        console.log(e)
        alert('City not found')
    }

    //remove loading spinner
    spinner.remove()
    

}


getWeather()