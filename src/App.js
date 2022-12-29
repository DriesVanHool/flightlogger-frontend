import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import FlightTable from "./components/FlightTable";
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import ManageFlight from "./components/ManageFlight";

function App() {
  return (
      <div className="container-fluid">
          <Header/>
        <div className="row">
          <div className="col-md-12">
              <BrowserRouter>
                  <Routes>
                      <Route exact path="/" element={<FlightTable/>}/>
                      <Route exact path="/create" element={<ManageFlight/>}/>
                      <Route exact path="/edit" element={<ManageFlight/>}/>
                      <Route path="*" element={<Navigate to="/"/>}/>
                  </Routes>
              </BrowserRouter>
              <Outlet/>
          </div>
        </div>
      </div>
  );
}

export default App;
