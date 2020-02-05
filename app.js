window.onload = function(){
  let userCity = document.querySelector("#address-level2");
  let searchNow = document.querySelector("#src");
  let temp = document.querySelector(".temp");
  let cityname = document.querySelector(".cityname");
  let windspeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".humidity");
  let conditions = document.querySelector(".conditions");
  let mapimage = document.querySelector("img");
  let convertButton = document.querySelector(".cf");
  let presentSymbol = document.querySelector(".cf1");
  let celcius = true;
  let degree = "";
  
  convertButton.onclick = function () {
      if (celcius === true) {
          celcius = false;
          let temp2 = document.querySelector(".temp").textContent;
          document.querySelector(".temp").textContent = eval(Math.round((temp2 * 9 / 5) + 32));
          document.querySelector(".cf").textContent = "Convert to °C";
          document.querySelector(".cf1").textContent = "°F";
      } else {
          celcius = true;
          let temp2 = document.querySelector(".temp").textContent;
          document.querySelector(".temp").textContent = eval(Math.round((temp2 - 32) * 5 / 9));
          document.querySelector(".cf").textContent = "Convert to °F"
          document.querySelector(".cf1").textContent = "°C";
      }
  }
  
  const getDetails = (e) => {
      celcius == true ? degree = "°C" : degree = "°F"
      if (userCity.value === "" || userCity.value.length < 3) {
          temp.textContent = "City cannot be Empty"
      } else {
          document.querySelector(".cf1").textContent = "°C";
          celcius = true;
          celcius == true ? document.querySelector(".cf").textContent = "Convert to °F" : document.querySelector(".cf").textContent = "Convert to °C";
          let api = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&APPID=`;
          let apiKey = "cbad0e3cfefea9e90c408385308eba1d";
          let promise = fetch(api + apiKey).then(res => res.json());
          promise.then(data => cityname.innerHTML = data.name);
          promise.then(data => temp.textContent = Math.round(data.main.temp - 273.15));
          promise.then(data => conditions.textContent = "Conditions: " + data.weather[0].main)
          promise.then(data => windspeed.textContent = "Wind speed: " + Math.round(eval(data.wind.speed * 3.6)) + "Km/h")
          promise.then(data => humidity.textContent = "Humidity: " + data.main.humidity + "%")
          mapimage.src = `https://www.mapquestapi.com/staticmap/v5/map?key=1Slr4niNoYVAgwpoxoC3IiwfgkgI6aWD&center=${userCity.value}&size=500,250&locations=${userCity.value}|https://findicons.com/files/icons/2799/flat_icons/64/hamburguer_push_pin.png&defaultMarker=marker-417505-417505`
      }
      userCity.value = '';
      navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          console.log(lat, lng)
      })
      e.preventDefault();
  }
  
  searchNow.addEventListener("click", getDetails);
  
  
  
  }