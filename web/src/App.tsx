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
          throw new Error("Failed to fetch bus times from API");
        }

        const data = await response.json();
        setBusTimes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusTimes();

    const intervalId = setInterval(fetchBusTimes, 10000); // Interval to increment remaining time every 10 seconds
  }, []); // Empty dependency array - ensures run once only

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
