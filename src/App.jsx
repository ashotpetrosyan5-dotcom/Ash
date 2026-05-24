import "./App.css"

function MissionBadge({ name, status, date }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{status}</p>

      {date && <p>{date}</p>}
    </div>
  );
}



function App() {
  return (
    <div>
      <MissionBadge
        name="Apollo 11"
        status="Ավարտված"
        date="16 հլս, 1969 թ. – 24 հլս, 1969 թ."
      />

      <MissionBadge
        name="Mars Mission"
        status="Ընթացքի մեջ"
      />
    </div>
  );
}

export default App;

import {useState, useEffect } from 'react'

function ISSTracker(){
    useEffect(() => {
      console.log("component loaded")
    }, [])

    return <div className="card">
      <h2>ISS Position</h2>
    </div>
}

function ISSTracker(){
      const [location, setLocation] = useState(null)

      useEffect(() => {
        fetch('https://api.whertheiss.at/v1/satellites/25544')
          .then(r => r.json())
          .then(data => setLocation(data))
      }, [])

      return (
        <div className="card">
          <h2>ISS Position</h2>
          {location ? (
            <p>{location.latitude.toFixed(2)}, {location.longtitude.toFixed(2)}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )
}