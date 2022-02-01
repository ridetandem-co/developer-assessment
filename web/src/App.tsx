interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <div>
        <div>
          Live bus times for <b>Park Road</b>
        </div>
        <div className="Card">
          <div className="Card__Header">
            <b>176</b>
          </div>
          <div className="Card__Details">
            <div>To Newham Close</div>
            <div>2 mins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
