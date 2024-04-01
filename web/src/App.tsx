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
        const response = await fetch("http://localhost:3000/bus-times");
        if (!response.ok) {
          throw new Error("Failed to fetch bus times");
        }

        const data = await response.json();

        setBusTimes(data.slice(0, 5)); // Limit to a maximum of 5 buses
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusTimes(); // Fetch bus times initially
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const sortedBusTimes = [...busTimes].sort(
    (a, b) => a.minutesUntilArrival - b.minutesUntilArrival
  );

  return (
    <div className="App">
      <div>
        <div>
          Live bus times for <b>Park Road</b>
        </div>
        <div className="Card">
          {sortedBusTimes.map((bus) => (
            <div className="Card__Item" key={bus.id}>
              <div className="Card__Header">
                <b>{bus.busId}</b>
              </div>
              <div className="Card__Details">
                <div>To {bus.destination}</div>
                <div>
                  {bus.minutesUntilArrival <= 1
                    ? "Due"
                    : `${bus.minutesUntilArrival} mins`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
