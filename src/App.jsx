import { useState, useEffect } from 'react'
import './App.css'

function ISSTracker() {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    function fetchISS() {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(r => r.json())
        .then(data => setLocation(data))
    }
    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card">
      <h2>ISS Position</h2>
      {location ? (
        <div>
          <p>{location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°</p>
          <p>Altitude: {location.altitude.toFixed(0)} km</p>
          <p>Speed: {location.velocity.toFixed(0)} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

function PeopleInSpace() {
  const [people, setPeople] = useState(null)
  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className="card">
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} — {person.craft}
            </li>
          ))}
        </ul>
      ) : <p>Loading...</p>}
    </div>
  )
}
function APOD() {
  const [pic, setPic] = useState(null)
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])

  return (
    <div className="card">
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
            ? <img src={pic.url} alt={pic.title} style={{ width: '100%' }} />
            : <a href={pic.url} target="_blank">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}

function Asteroids() {
  const [rocks, setRocks] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => {
        setRocks(data.near_earth_objects[today])
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="card">
      <h2>Asteroids Today</h2>

      {rocks ? (
        <ul>
          {rocks.map(rock => (
            <li key={rock.id}>
              <h3>{rock.name}</h3>

              <p>
                Max Diameter:{' '}
                {rock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)} m
              </p>

              <p>
                Hazardous:{' '}
                {rock.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


export default function App(){
  return(
    <div>
      <ISSTracker/>
      <APOD/>
      <Asteroids/>
      <PeopleInSpace/>
      <SpaceWeather />
    </div>
  )
}

function SpaceWeather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetch('https://services.swpc.noaa.gov/products/summary/solar-wind.json')
      .then(r => r.json())
      .then(data => {
        if (data.length > 1) {
          setWeather(data[data.length - 1])
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="card">
      <h2>Space Weather</h2>

      {weather ? (
        <div>
          <p className="label">Solar Wind Speed</p>
          <p>{parseFloat(weather[1]).toFixed(0)} km/s</p>

          <p className="label">Temperature</p>
          <p>{parseFloat(weather[2]).toLocaleString()} K</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}