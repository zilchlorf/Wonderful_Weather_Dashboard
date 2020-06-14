let city, url, APIkey, etc;

var submitButton = document.querySelector("#submitButton")

url = "https://api.openweathermap.org/data/2.5/forecast?q=";
currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
APIkey = "&APPID=187b175e5dec11ce8a3bab842028437f";



/*submitButton.addEventListener("click", function () {*/
city = $("#cityInput").val()
$.ajax({
    url: currenturl + "new%20york" + APIkey,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=minutely,hourly${APIkey}`,
        method: "GET"
    }).then(function (res) {
        console.log(res)
        let temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32))

        // $("#today_temp").html("Temperature: " + res.current.temp)
        $("#today_temp").html("Temperature: " + temp + String.fromCharCode(176) + "F");

    })
})
//})