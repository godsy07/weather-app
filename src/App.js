import React, { useState, useEffect } from "react";
import { API_WEATHER, API_UNSPLASH } from "./keys";

const App = () => {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);

  const weatherKey = API_WEATHER;
  const unsplashKey = API_UNSPLASH;

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${weatherKey}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=${unsplashKey}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='app'>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
