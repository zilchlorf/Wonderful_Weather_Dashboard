let city, url, APIkey = "";
var citiesDiv = document.querySelector("searched_cities_container")
var searchbtn = document.querySelector("#searchbtn")
//start with empty array
let cities = [];

url = "https://api.openweathermap.org/data/2.5/forecast?q=";
currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
APIkey = "&APPID=187b175e5dec11ce8a3bab842028437f";

$("#searchbtn").on("click", function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim()
    cities.push(city);
    if (cities.length > 10) {
        cities.shift()
    }
    if (city === "") {
        return;
    }

    $.ajax({
        url: currenturl + city + APIkey,
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
            if (UVresponse.current.uvi > 8) { $(".today_weather").css({ "background-color": "red" }) }
            if (UVresponse.current.uvi > 7) { $(".today_weather").css({ "background-color": "orange" }) }
            if (UVresponse.current.uvi < 8) { $(".today_weather").css({ "background-color": "orange" }) }
            if (UVresponse.current.uvi < 7) { $(".today_weather").css({ "background-color": "green" }) }




        });
    })
})
