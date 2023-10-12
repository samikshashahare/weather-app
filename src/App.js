import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("pune");
  const [weatherdescription, setWeatherdescription] = useState("");


  async function loadweatherData() {
    let response = ""
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)
    }
    catch (error) {
      console.log(error);
    }
    // const response = api se kya response aayega


    setWeatherData(response.data);
  }
  useEffect(() => {
    loadweatherData();
  }, [])

  useEffect(() => {
    loadweatherData();
  }, [city])

  useEffect(() => {

    setWeatherdescription(`${weatherData?.weather?.[0]?.description}(${weatherData?.weather?.[0]?.main})`)


  }, [weatherData])


  return (
    <>

      <div className='WeatherApp-main-div' >
        <div className='sub-div'>
<h1 className='head'>Wheather-App<span className='cloud'>☁</span>
</h1>


         <input type='text' value={city} onChange={(e) => {
            setCity(e.target.value);
          }} className='input-box' />

          {/* many times data of weather can be undefine thats why (?) use this operator */}
          <div className='weather-description' >
          <h2>City:{weatherData?.name }</h2>
<div className='div-1'>
  
<h2 className='temp'>Temp ⛅: {(weatherData?.main?.temp - 273).toFixed(2)} °C</h2>

<h2 className='desc'>Description :<br /> {weatherdescription} </h2>
</div>

<h2 className='visibility'>Visibility: {weatherData?.visibility} meters</h2>
          </div>
        </div>
      </div>


    </>
  )
}

