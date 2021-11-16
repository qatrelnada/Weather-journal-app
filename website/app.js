/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
// const apiKey = '02977d9d17b1c2fc70c78575eb25b3e6'

// Create a new date instance dynamically with JS
let date = new Date();
let day = date.getDate();
let month = date.getMonth() +1;
let year = date.getFullYear();
let newDate = day+' / '+month+' / '+ year;

// GET api key
let apiKey;

fetch("/api")
.then(async (apiKeyRes) => {
    apiKey = await apiKeyRes.text()
})

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction() {

    //Select actual value of html input to include in post
    const zipCode = document.getElementById('zip').value;
    // const feelings = document.getElementById('feelings').value;

    const url = `${baseURL}${zipCode}&appid=${apiKey}&units=metric`;

    if (zipCode==="") {
        alert("Please enter the zip code");
    }
    else {
        //call  getData function
        getData(url) 
        .then(function (userData) {
            //Add data to post request
            //call function & pass it POST route url & data to save in app
            postData('/add', {
                date: newDate, 
                temp: userData.main.temp, 
                // content: feelings
            })
        })
        .then(function (newData) {
            //call function to update browser content
            updateUI(newData)
        })
    } 
}

/* Function to GET Web API Data*/
//Write an async function to make a GET request to the OpenWeatherMap API
const getData = async (url) => {
    //code to fetch data from api (await the fetch)
    const res = await fetch(url);

    try {
        //code to convert json data to js object and return result (await conversion)
            const userData = await res.json();

            if (userData.message==="city not found") {
                alert("enter a zip code in USA");
            }
            else {
                return userData;
            }
                
    } 
    catch (error) {
        //code to log error
        //appropriately handle the error
        console.log('error', error);
    }      
};

/* Function to POST data */
//function to create POST requests
const postData = async (url = '', data) => {
    //code to fetch route url and write request method, credentials, headers and body
    const req = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            // content: data.content
        }), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await req.json();
        // console.log(newData)    
        return newData
    } catch (error) {
        console.log("error", error);
        //appropriately handle the error
    }
};

/* Function to GET Project Data */
//setup helper function to use fetch to make async GET req for route
const updateUI = async () => {
    //code to fetch data from server. Use url from GET route (await the fetch)
    const request = await fetch ('/all');
    try {
        //code to convert json data . (await conversion)
        const allData = await request.json()
        // console.log(allData)
        //code to update the UI with the fetched data
        //update Most Recent Entry 
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temp: " + allData.temp;
        // document.getElementById('content').innerHTML = "Feeling: " + allData.content;
    } catch (error) {
        console.log('error', error);
    }
};