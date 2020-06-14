let city, url, APIkey = "";
var cityInput = document.querySelector("searched_cities_container")

var searchbtn = document.querySelector("#searchbtn")
//start with empty array
let cities = [];

url = "https://api.openweathermap.org/data/2.5/forecast?q=";
currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
APIkey = "&APPID=187b175e5dec11ce8a3bab842028437f";


// searchbtn.addEventListener("click", function(event) {
city = $("#cityInput").val()
$.ajax({
    url: currenturl + "portland" + APIkey,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=minutely,hourly${APIkey}`,
        method: "GET"
    }).then(function (UVresponse) {
        console.log(UVresponse)
        let temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32))
        $("#today_temp").html("Temperature: " + temp + String.fromCharCode(176) + "F");
        $("#today_humidity").html("Humidity: " + response.main.humidity + '%');
        $("#today_wind_speed").html("Wind Speed: " + response.wind.speed + ' ' + 'MPH');
        $("#today_UV_Index").html("UV Index: " + UVresponse.current.uvi);
        $("#today_icon_div").attr({
            "src": "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
            "height": "120px", "width": "120px"
        });

    });
})
// })