import React, {useState} from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [icon, setIcon] = useState('')





  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_URL}&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
      setIcon(data.weather[0].icon)

    }

  }


  return (
    <div className="app">
      <div className='search'>
        <input type='text' placeholder='Enter Location' value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}, {data.sys ? <h3>{data.sys.country}</h3> : null}</p>
            </div>
            <div className='temp'>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className='desc'>
              {data.weather ? <p>{data.weather[0].main}</p>: null}


            </div>
           </div>
           {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}

              <p className='mobile'>Feels Like</p>
            </div>
            <div className='humidity '>
              {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
              <p className='mobile'>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed}MPH</p> : null}
              <p className='mobile'>Wind Speed</p>
            </div>
        </div>
           }
      </div>
    </div>
  );
}

export default App;
