import React, { useState, useEffect } from "react";

interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
}

const App: React.FC = () => {
  const [busTimes, setBusTimes] = useState<BusTime[]>([]);

  useEffect(() => {
    const fetchBusTimes = async () => {
      try {
        const response = await fetch("https://localhost:3000/bus-times");
        if (!response.ok) {
          throw new Error("Failed to fetch bus times from API");
        }

        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusTimes();
  }, []);

  return (
    <div className="App">
      <div>
        <div>
          Live bus times for <b>Park Road</b>
        </div>
        <div className="Card">
          {busTimes.map((bus) => (
            <div className="Card__Item" key={bus.id}>
              <div className="Card__Header">
                <b>{bus.busId}</b>
              </div>
              <div className="Card__Details">
                <div>To {bus.destination}</div>
                <div>{bus.minutesUntilArrival} mins</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
