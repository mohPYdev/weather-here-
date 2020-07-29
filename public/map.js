
//receiving the data from the APIs
async function getData(){
    const response  = await fetch('/api');
    const data = await response.json();
    return data;
    }


//creating the map
const myMap = L.map('mapid').setView([0 , 0], 1);

//creating the tile of the map using openstreetmap 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibW9ocHlkZXYiLCJhIjoiY2tkMWhjdzlhMTNqbDJ0cGdlYnd4b2IxOCJ9.HMIyNbKyLGX3KH-oaKF80Q'
}).addTo(myMap);

//add the marker to the map
async function addMarkers(){
    const data=  await getData();
    for (item of data){
        const lat = item.location.lat;
        const lon = item.location.lon;
        const marker = L.marker([lat, lon]).addTo(myMap);
        let text = `<p>the latitude is ${lat} and the longitude is ${lon}</p>`;
        text += `<p>the weather in ${item.location.region} , ${item.location.country} is ${item.current.weather_descriptions[0]} and the temperature is ${item.current.temperature}&#8451;</p>`;
        text += `<img src = ${item.current.weather_icons[0]}>`;
        marker.bindPopup(text);
    }
    
}

addMarkers();



