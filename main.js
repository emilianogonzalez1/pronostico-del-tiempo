document.getElementById("formulario").addEventListener('submit', (e)=>{
e.preventDefault()

const alert = document.querySelector('.alert');
const city = document.querySelector('#ciudad').value
const contenedor = document.querySelector('.clima');

const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d9680d24d8bb7192b8ba4825ba5833de`

fetch(GEO_URL)
.then(response => response.json())
.then(data => {

    if(data.length === 0){
        alert.classList.remove('d-none');
        contenedor.classList.add('d-none');
    }
    else{
        alert.classList.add('d-none');
        contenedor.classList.remove('d-none');
        
        const longitud = data[0].lon;
        const latitud = data[0].lat;
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=d9680d24d8bb7192b8ba4825ba5833de`
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            
           contenedor.innerHTML = `
            <p class="temp" id="temp">Temperatura: ${Math.trunc(data.main.temp - 273.15)}°C</p>
            <p class="humedad" id="humedad">Humedad: ${data.main.humidity}%</p>
            <p class="descripcion" id="descripcion">Descripcion: <span first-letter="text-transform: upperCase">${data.weather[0].description}</span></p>
            <p class="viento" id="viento">Viento: ${data.wind.speed}m/s</p>
           `
        
        }) 
    }

})
})











