import React, {useEffect, useState} from "react";
import {Form, Table} from "react-bootstrap";
import {getFlights} from "../api/FlightService";
import FlightInfo from "./FlightInfo";

function FlightTable(){
    const [flights, setFlights] = useState([]);
    const [selectedFlight, selectFlight] = useState(null);
    const [filterText, setFilterText] = useState("");
    useEffect(updateFlights, []);

    function updateFlights(){
        getFlights().then((result) => setFlights(result.data)).then((selectFlight(null)))
    }

    const searchFlights = flights.filter((flight)=> flight.departureAirport.name.toLowerCase().includes(filterText))

    return (
        <div>
            <Form id="searchInput">
                <Form.Control
                    type="search"
                    placeholder="Search departure"
                    className="me-2"
                    aria-label="Search"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Departure time</th>
                    <th>Airport</th>
                    <th>Arrival time</th>
                    <th>Airport</th>
                </tr>
                </thead>
                <tbody>
                {searchFlights.map((flight) =>(
                    <tr key={flight.id}
                        onClick={() => selectFlight(flight)}>
                        <td>{flight.departureTime}</td>
                        <td>{flight.departureAirport.name}</td>
                        <td>{flight.arrivalTime}</td>
                        <td>{flight.arrivalAirport.name}</td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
            {
                selectedFlight?(<FlightInfo selectedFlight = {selectedFlight}
                                            triggerParentUpdate = {updateFlights}/>):null
            }
        </div>
    )
}

export default FlightTable;