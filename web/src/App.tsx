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

    // Set up interval to increment remaining time every 10 seconds
    const intervalId = setInterval(() => {
      setBusTimes((prevBusTimes) =>
        prevBusTimes.map((bus) => ({
          ...bus,
          minutesUntilArrival: bus.minutesUntilArrival + 1,
        }))
      );
    }, 10000);

    return () => clearInterval(intervalId); // Function to clear interval when component unmounts
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Update Bus Times with Fetched Data
  useEffect(() => {
    const updateBusTimes = async () => {
      setBusTimes((prevBusTimes) => {
        // Filter out buses with arrival time greater than 0
        const updatedBusTimes = prevBusTimes
          .map((bus) => ({
            ...bus,
            minutesUntilArrival: Math.max(0, bus.minutesUntilArrival - 1),
          }))
          .filter((bus) => bus.minutesUntilArrival > 0);
        return updatedBusTimes;
      });
    };

    const intervalId = setInterval(updateBusTimes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchNewBuses = async (count: number): Promise<BusTime[]> => {
    try {
      const response = await fetch(`http://localhost:3000/bus-times`);
      if (!response.ok) {
        throw new Error("Failed to fetch new buses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

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
