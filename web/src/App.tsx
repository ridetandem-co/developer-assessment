import React, { useState, useEffect } from "react";
import "../src/style/index.css";

interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
  nonOperationalDays?: number[];
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

        const currentDayOfWeek = new Date().getDay(); // Get current day of the week

        // Filter bus times to only include routes operational on the current day of the week
        const filteredBusTimes = data.filter((bus: BusTime) =>
          bus.nonOperationalDays
            ? !bus.nonOperationalDays.includes(currentDayOfWeek)
            : true
        );

        setBusTimes(filteredBusTimes); // Set filtered bus times fetched from the API
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusTimes(); // Fetch bus times initially

    const intervalId = setInterval(() => {
      fetchBusTimes(); // Fetch bus times every 10 seconds
    }, 10000); // Set up interval to fetch bus times every 10 seconds

    return () => clearInterval(intervalId); // Clean-up function to clear interval when component unmounts
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Sort the buses by arrival time before rendering
  const sortedBusTimes = [...busTimes].sort(
    (a, b) => a.minutesUntilArrival - b.minutesUntilArrival
  );

  return (
    <div className="App">
      <div>
        <div className="title">
          Live bus times for <b>Park Road</b>
        </div>
        <div className="Card">
          {sortedBusTimes.map((bus) => (
            <div
              className={`Card__Item ${
                bus.minutesUntilArrival <= 1 ? "due" : ""
              }`}
              key={bus.id}
            >
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
