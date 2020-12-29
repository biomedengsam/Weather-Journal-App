/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '000fdab0b1e92e37123dff7f4815ae81';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Slow background video play back rate
let video = document.getElementById('video');
video.playbackRate = 0.5;

// Add event listener for button
document.getElementById('generate').addEventListener('click', performAction);

// Callback function for event listener
function performAction() {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    let apiCall = `${baseURL}${zipCode}&units=metric&appid=${apiKey}`;

    getData(apiCall)
        .then(function (data) {
            postData('/add', { temperature: data.main.temp, city: data.name, date: newDate, userResponse: feelings });
            (updateUI())
        })
}

// Get data from API
const getData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        //Checks if the required data is available
        if (data.cod === '404') {
            alert(data.message);
        }
        else {
            return data;
        }
    }
    catch (error) {
        console.log("error", error);
    }
}

// Post request to add the API data and user response
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}

// Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('entryHolder').style.display = 'flex';
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('feelings').value = "";
        document.getElementById('city').innerHTML = allData.city;
    }
    catch (error) {
        console.log("error", error);
    }
}