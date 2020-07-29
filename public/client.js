
async function getCords() {
    // get the ip API
    const response1 = await fetch('https://api.ipify.org?format=json');
    const ip = await response1.json();
    
    // the coordinates API
    const response2 = await fetch(`/coords/${ip.ip}`);
    const data = await response2.json();
    const loc = data.loc;
    console.log("got the cords");
    console.log(loc);
    return loc;
}


async function getWeather(){
    const latlon = await getCords();
    const response = await fetch(`/weather/${latlon}`);
    const data = await response.json();
    console.log("got the weather data!");
    console.log(data);
    return data;
}


async function postData() { 
    const data = await getWeather();
    console.log("posting now!");
    console.log(data);
    const option = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('/api' , option);
    const json=  await response.json();
    console.log(json);
}


const addEl = document.getElementById('add');
addEl.addEventListener('click', () => {
    postData();
});
