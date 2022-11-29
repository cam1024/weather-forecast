var apiKey = "202f7bf441b9d45eeccbdc991cdc2249";
var searchForm = document.getElementById("search-form");
var historyEl = document.getElementById("search-history");
var cityName = "";

var cityList = [];
var apiUrl = "https://api.openweathermap.org/data/2.5/"
// API endpoint based on a city name, converts to lat/lon data
function getCoordinates() {
    var city = searchForm.children[1].value
    console.log(apiUrl)
    fetch(apiUrl + "weather?q=" + city + "&appid=" + apiKey)
        .then(function (response) {
            // request was not successful
            if (!response.ok) {


                console.log(response)


            }
            return response.json()
        }).then(function (data) {
            console.log("line 48", data);
            //need to store lat and lon.
            var getdatalat
            var getdatalon

            return data
        })
        // } else {
        //     console.log ("Bad response getting weather data");
        // }
        .catch(function (_error) {
            console.log("Error in getting weather data");
        })
}

function getCityData(lat, lon) {
    var date = new Date();
    var newDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
    var weekday = date.toLocaleDateString("en-US", { weekday: 'long' });

    // Use Open Weather API with lattitude and longitude values to pull weather data
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    var apiUrlforecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    fetch(apiUrlforecast)
        .then(function (response) {
            console.log(response)
            if (!response.ok) {

                console.log("ok")

                document.getElementById("city").innerHTML = data.name;

                document.getElementById("todays-date").textContent = newDate;

                document.getElementById("temp").textContent = data.main.temp;

                document.getElementById("wind").textContent = data.wind.speed;
                document.getElementById("humidity").textContent = data.main.humidity;
            }

        })
        .catch(function (error) {
            document.getElementById("warning").style.display = "block";
            console.log("Error in getting weather data");
        });
}


// Write to history sidebar and localStorage


// Pull in cities from localStorage (for sidebar)
function getCities() {

    var storedCities = JSON.parse(localStorage.getItem("cityList"));

    if (storedCities) {
        for (var a = 0; a < storedCities.length; a++) {
            var cityItem = document.createElement("div");
            cityItem.className = "prev-city";
            cityItem.innerHTML = storedCities[a] + "<i class='bi bi-trash' title='Delete city'></i>"
            historyEl.appendChild(cityItem);
        }

        cityList = storedCities.slice();
    }
}

// Remove item from history sidebar and localStorage
function removeItem(city) {
    for (var a = 0; a < cityList.length; a++) {
        if (cityList[a] === city) {
            cityList.splice(a, 1);
            console.log(cityList);
            break;
        }
    }

    var historyEl = document.getElementsByClassName("prev-city");

    for (var a = 0; a < historyEl.length; a++) {
        if (historyEl[a].textContent.indexOf(city) != -1) {
            historyEl[a].remove();
        }
    }

    localStorage.setItem("cityList", JSON.stringify(cityList));
}

function storeCity(city) {
    var historyEl = document.getElementById("search-history");
    alreadyAdded = false;

    // Check for duplicate city name, if present, exit function
    for (var a = 0; a < cityList.length; a++) {
        if (cityList[a] === city) {
            alreadyAdded = true;
            return;
        }
    }

    //If no duplicate, continue adding to history and localStorage
    cityList.push(city);

    var cityItem = document.createElement("div");
    cityItem.className = "prev-city";
    cityItem.innerHTML = city + "<i class='bi bi-trash' title='Delete city'></i>"

    historyEl.appendChild(cityItem);

    localStorage.setItem("cityList", JSON.stringify(cityList));
}

// Click event for history sidebar, cities, as well as trash icons
historyEl.addEventListener("click", function (event) {
    document.getElementById("city-search").value = "";
    getCoordinates(event.target.textContent)

    // Clicked on trash icon
    if (event.target.classList.contains("bi")) {
        removeItem(event.target.parentNode.textContent);
    }
});

// Click event for form submit
// searchForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("line 177", event)
//     getCoordinates(event.target.value);

// });

