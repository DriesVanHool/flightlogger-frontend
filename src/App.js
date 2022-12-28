import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import FlightTable from "./components/FlightTable";

function App() {
  return (
      <div className="container-fluid">
          <Header/>
        <div className="row">
          <div className="col-md-12">
              <FlightTable/>
          </div>
        </div>
      </div>
  );
}

export default App;
