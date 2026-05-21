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