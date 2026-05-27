import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

// ==========================================
// 1. ՊԱՀԵՍՏԱՅԻՆ ՏՎՅԱԼՆԵՐ
// ==========================================
const BACKUP_ASTRONAUTS = [
  {
    id: "backup_1",
    name: "Oleg Novitskiy",
    profile_image: "data:image/jpeg;base64,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",
    nationality: "Russian",
    date_of_birth: "1971-10-12",
    bio: "Oleg Novitskiy is a former Russian cosmonaut who has spent extensive time aboard the International Space Station (ISS) across multiple missions."
  },
  {
    id: "backup_2",
    name: "Loral O'Hara",
    profile_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ChZeyN1Hj1SzxP5Fgjk-oQsHrKw4tQsE9g&s",
    nationality: "American",
    date_of_birth: "1983-05-03",
    bio: "Loral O'Hara is an American engineer and NASA astronaut selected in 2017. She completed her first flight to the International Space Station."
  },
  {
    id: "backup_3",
    name: "Marina Vasilevskaya",
    profile_image: "https://sm.mashable.com/mashable_in/seo/7/70042/70042_1kpu.png",
    nationality: "Belarusian",
    date_of_birth: "1990-09-14",
    bio: "Marina Vasilevskaya is a Belarusian flight attendant and spaceflight participant who flew aboard the Soyuz MS-25 mission."
  },
  {
    id: "backup_4",
    name: "Matthew Dominick",
    profile_image: "",
    nationality: "American",
    date_of_birth: "1981-12-07",
    bio: "Matthew Dominick is a US Navy test pilot and NASA astronaut, commander of the SpaceX Crew-8 mission."
  },
  {
    id: "backup_5",
    name: "Michael Barratt",
    profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Michael_Barratt_official_NASA_portrait_in_blue_flight_suit.jpg/640px-Michael_Barratt_official_NASA_portrait_in_blue_flight_suit.jpg",
    nationality: "American",
    date_of_birth: "1959-04-16",
    bio: "Michael Barratt is an American physician and NASA astronaut who specializes in aerospace medicine."
  },
  {
    id: "backup_6",
    name: "Jeanette Epps",
    profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Jeanette_Epps_official_portrait.jpg/640px-Jeanette_Epps_official_portrait.jpg",
    nationality: "American",
    date_of_birth: "1970-11-03",
    bio: "Jeanette Epps is an American aerospace engineer and NASA astronaut who flew on the SpaceX Crew-8 mission."
  },
  {
    id: "backup_7",
    name: "Alexander Grebenkin",
    profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aleksandr_Grebyonkin_2023.jpg/640px-Aleksandr_Grebyonkin_2023.jpg",
    nationality: "Russian",
    date_of_birth: "1982-07-15",
    bio: "Alexander Grebenkin is a Russian cosmonaut selected by Roscosmos in 2018, serving as a flight engineer."
  },
  {
    id: "backup_8",
    name: "Tracy Caldwell Dyson",
    profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Tracy_Caldwell_Dyson_official_portrait.jpg/640px-Tracy_Caldwell_Dyson_official_portrait.jpg",
    nationality: "American",
    date_of_birth: "1969-08-14",
    bio: "Tracy Caldwell Dyson is an American chemist and NASA astronaut who completed multiple long-duration ISS flights."
  },
  {
    id: "backup_9",
    name: "Nikolai Chub",
    profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Nikolay_Chub_2021.jpg/640px-Nikolay_Chub_2021.jpg",
    nationality: "Russian",
    date_of_birth: "1984-06-10",
    bio: "Nikolai Chub is a Russian cosmonaut selected in 2012 who launched to the ISS on Soyuz MS-24."
  }
];

// --- ISS TRACKER ---
function ISSTracker() {
  const [location, setLocation] = useState(null)
  
  useEffect(() => {
    function fetchISS() {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(res => res.json())
        .then(data => setLocation(data))
        .catch(err => console.log(err))
    }
    fetchISS();
    const interval = setInterval(fetchISS, 5000);
    return () => clearInterval(interval);
  }, [])
  
  return (
    <div className="card">
      <h2>ISS Tracker</h2>
      {location ? (
        <div>
          <p><span className="label">Latitude:</span> {Number(location.latitude).toFixed(4)}</p>
          <p><span className="label">Longitude:</span> {Number(location.longitude).toFixed(4)}</p>
          <p><span className="label">Velocity:</span> {Number(location.velocity).toFixed(2)} km/h</p>
        </div>
      ) : <div className="loading">Tracking ISS...</div>}
    </div>
  )
}

// --- APOD ---
function APOD() {
  const [pic, setPic] = useState(null)
  
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="card">
      <h2>Picture of the Day</h2>
      {pic ? (
        <>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image' ? (
            <img src={pic.url} alt={pic.title} />
          ) : (
            <div className="video-container">
              <iframe 
                src={pic.url ? pic.url.replace('watch?v=', 'embed/') : ''} 
                title={pic.title} 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          )}
          <details>
            <summary>Explanation</summary>
            <p>{pic.explanation}</p>
          </details>
        </>
      ) : <div className="loading">Loading...</div>}
    </div>
  )
}

// --- ASTEROIDS ---
function Asteroids() {
  const [rocks, setRocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeRockId, setActiveRockId] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => {
        const items = data.near_earth_objects?.[today] || []
        const specialRocks = [
          { id: 'special_1', name: '(2015 HA10)', estimated_diameter: { meters: { estimated_diameter_max: 32.0 } }, is_potentially_hazardous_asteroid: false, imgUrl: 'https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/GettyImages-1214628962?_a=BAVMn6DY0' },
          { id: 'special_2', name: '(2000 SG344)', estimated_diameter: { meters: { estimated_diameter_max: 37.0 } }, is_potentially_hazardous_asteroid: false, imgUrl: 'https://miro.medium.com/1*DQnq3A4Q6bRWWBhqScUYfw.jpeg' },
          { id: 'special_3', name: '(2013 CY)', estimated_diameter: { meters: { estimated_diameter_max: 25.0 } }, is_potentially_hazardous_asteroid: false, imgUrl: 'https://www.snexplores.org/wp-content/uploads/sites/3/2025/12/1440_AT_asteroid_death_feat.jpg?w=1030' }
        ]
        const sorted = items.map((item, index) => {
          const remainingImages = [
            'https://dailygalaxy.com/wp-content/uploads/2025/01/Asteroid-Comet-Hybrid.jpg',
            'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2025/10/types_of_asteroids/26949317-1-eng-GB/Types_of_asteroids_article.jpg'
          ];
          return { ...item, imgUrl: remainingImages[index % remainingImages.length] };
        });
        setRocks([...specialRocks, ...sorted])
        setLoading(false)
      })
      .catch(err => { console.log(err); setLoading(false); })
  }, [])

  return (
    <div className="card">
      <h2>Asteroids Today</h2>
      {loading ? <div className="loading">Loading...</div> : rocks.length > 0 ? (
        <ul className="asteroid-list">
          {rocks.slice(0, 6).map(rock => (
            <li key={rock.id} className="asteroid-item">
              <div className="asteroid-row">
                <span className="ast-name">{rock.name}</span>
                <span className="ast-data">Dia: {rock.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(1)} m</span>
                <span className="ast-data">Haz: {rock.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</span>
                <button className="view-btn" onClick={() => setActiveRockId(activeRockId === rock.id ? null : rock.id)}>
                  {activeRockId === rock.id ? 'Hide' : 'Click'}
                </button>
              </div>
              {activeRockId === rock.id && rock.imgUrl && (
                <div className="asteroid-img-container">
                  <img src={rock.imgUrl} alt={rock.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : <p>No asteroids registered for today.</p>}
    </div>
  )
}

// --- PEOPLE IN SPACE ---
function PeopleInSpace() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;

    async function fetchPeople() {
      try {
        const res = await fetch("https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true")
        if (!res.ok) {
          if (isMounted) { setPeople(BACKUP_ASTRONAUTS); setLoading(false); }
          return;
        }
        const data = await res.json()
        if (isMounted) {
          if (data.results && data.results.length > 0) {
            setPeople(data.results)
          } else {
            setPeople(BACKUP_ASTRONAUTS)
          }
        }
      } catch (err) {
        if (isMounted) setPeople(BACKUP_ASTRONAUTS)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPeople()
    return () => { isMounted = false; }
  }, [])

  return (
    <div className="card">
      <h2>People in Space</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="astronaut-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', marginTop: '15px' }}>
          {people.map((p) => (
            <div key={p.id} className="astronaut-card" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(74,222,128,0.1)' }}>
              <Link to={`/astronaut/${p.id}`} style={{ color: '#4ade80', fontWeight: 'bold', textDecoration: 'none', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                {p.name}
              </Link>
              {p.profile_image && (
                <div style={{ width: '100%', height: '180px', borderRadius: '8px', overflow: 'hidden', background: '#151515', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={p.profile_image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- ASTRONAUT DETAIL ---
function AstronautDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [astronaut, setAstronaut] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;

    if (id && id.startsWith('backup_')) {
      const backupPerson = BACKUP_ASTRONAUTS.find(p => p.id === id);
      if (backupPerson && isMounted) {
        setAstronaut(backupPerson);
        setLoading(false);
      }
      return;
    }

    async function fetchAstronautDetail() {
      try {
        const res = await fetch(`https://ll.thespacedevs.com/2.2.0/astronaut/${id}/`)
        if (!res.ok) {
          const fallback = BACKUP_ASTRONAUTS.find(p => p.id === `backup_${id}` || p.name === id);
          if (fallback && isMounted) setAstronaut(fallback);
          return;
        }
        const data = await res.json()
        if (isMounted) setAstronaut(data)
      } catch (err) {
        const fallback = BACKUP_ASTRONAUTS.find(p => p.id === id);
        if (fallback && isMounted) setAstronaut(fallback);
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAstronautDetail()
    return () => { isMounted = false; }
  }, [id])

  if (loading) return <div className="loading">Loading biography...</div>
  if (!astronaut) return <div className="error" style={{padding: '40px', textAlign:'center'}}>Astronaut not found. <button onClick={() => navigate(-1)}>Go Back</button></div>

  return (
    <div className="app" style={{maxWidth: '800px'}}>
      <div className="card astronaut-detail" style={{ padding: '20px', color: '#fff' }}>
        <button onClick={() => navigate(-1)} style={{ background: '#4ade80', border: 'none', padding: '8px 15px', borderRadius: '6px', color: '#000', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>
          ← Back
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {astronaut.profile_image && (
            <img 
              src={astronaut.profile_image} 
              alt={astronaut.name} 
              style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '12px', background: '#151515', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '15px' }} 
            />
          )}
          <h2>{astronaut.name}</h2>
          <p><strong>Nationality:</strong> {astronaut.nationality?.name || astronaut.nationality || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {astronaut.date_of_birth || 'N/A'}</p>
          <p style={{ marginTop: '15px', lineHeight: '1.6', color: '#ccc', maxWidth: '600px' }}>
            {astronaut.bio || 'Biography not available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// --- SPACE WEATHER ---
function SpaceWeather() {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
        const data = await response.json()
        if (data && data.length > 0) setWeather(data[data.length - 1])
      } catch (err) { console.log(err) }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card">
      <h2>Space Weather</h2>
      {weather ? (
        <div style={{textAlign: 'center'}}>
          <p className="label">KP Index</p>
          <p style={{fontSize: '2rem', color: '#4ade80', margin: '5px 0'}}>{weather.kp_index}</p>
          <p className="label">Time</p>
          <p>{new Date(weather.time_tag).toLocaleString()}</p>
        </div>
      ) : <div className="loading">Loading...</div>}
    </div>
  )
}

// --- MARS PHOTOS ---
function MarsPhotos() {
  const photos = [
    "https://cff2.earth.com/uploads/2025/04/27141951/Curiosity-rover--1400x850.jpg",
    "https://helios-i.mashable.com/imagery/articles/01Met8mQwc8XRFJX8sVyMFb/hero-image.fill.size_1248x702.v1747843899.jpg",
    "https://www.sciencedaily.com/images/1920/nasa-perseverance-rover-captures-mars-vista.webp",
    "https://www.cnet.com/a/img/resize/a7d12963b7f629a312705c97c81285fa46b698aa/hub/2022/10/19/f3a871d9-f68e-4a3e-b7be-7c7d379da93e/curiositysaltyview.jpg?auto=webp&fit=crop&height=675&width=1200"
  ]
  return (
    <div className="card">
      <h2>Mars Rover Photos</h2>
      <div className="mars-grid">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt="Mars" className="mars-img" />
        ))}
      </div>
    </div>
  )
}

// --- LAUNCHES ---
function Launches() {
  const [launches, setLaunches] = useState([])
  
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/upcoming')
      .then(r => r.json())
      .then(data => setLaunches(data.slice(0, 5)))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="card">
      <h2>Upcoming Launches</h2>
      {launches.length > 0 ? (
        <ul style={{listStyle: 'none', padding: 0}}>
          {launches.map(launch => (
            <li key={launch.id} style={{marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '5px'}}>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#4ade80' }}>{launch.name}</p>
              <p className="label" style={{margin: 0}}>{new Date(launch.date_utc).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : <div className="loading">Loading...</div>}
    </div>
  )
}

// --- SOLAR SYSTEM ---
function SolarSystem() {
  return (
    <div className="card full-width">
      <h2>Interactive Solar System</h2>
      <div className="solar-iframe-container">
        <iframe src="https://eyes.nasa.gov/apps/solar-system/#/sc_osiris_rex?rate=1814400&time=2021-02-17T21:06:45.412+00:00" title="NASA Eyes" style={{ width: "100%", height: "100%", border: "none" }} />
      </div>
    </div>
  )
}

// --- DASHBOARD COMPONENT ---
function Dashboard() {
  return (
    <div className="app">
      <h1 className="title">SPACE DASHBOARD</h1>
      
      {/* display: flex և flexDirection: column-ը կշարեն բոլոր քարտերը իրար տակ */}
      <div 
        className="grid" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '25px', 
          maxWidth: '800px', 
          margin: '0 auto'   
        }}
      >
        <ISSTracker />
        <APOD />
        <Asteroids />
        <PeopleInSpace />
        <SpaceWeather />
        <MarsPhotos />
        <Launches />
        <SolarSystem />
      </div>
    </div>
  )
}

// --- APP ROOT WITH ROUTER ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/astronaut/:id" element={<AstronautDetail />} />
      </Routes>
    </BrowserRouter>
  )
}