import React from "react";
import {Modal, Button} from "react-bootstrap";
import {deleteFlight} from "../api/FlightService";
import {Link} from "react-router-dom";

function FlightInfo({selectedFlight, triggerParentUpdate}) {
    const handleDelete = () => deleteFlight(selectedFlight.id).then(triggerParentUpdate);
    return (
        <div
            className="modal show"
            style={{display: 'block'}}
        >
            {selectedFlight && (
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Flight information</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="flightInfo">
                        <div className="row">
                            <div className="col-md-6">
                                <h6>{selectedFlight.departureAirport.name}: {selectedFlight.departureTime}</h6>
                                <p>IATA: {selectedFlight.departureAirport.iata} -
                                    ICAO: {selectedFlight.departureAirport.icao}</p>
                            </div>
                            <div className="col-md-6">
                                <h6>{selectedFlight.arrivalAirport.name}: {selectedFlight.arrivalTime}</h6>
                                <p>IATA: {selectedFlight.arrivalAirport.iata} -
                                    ICAO: {selectedFlight.arrivalAirport.icao}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Aircraft:</h6>
                                <p>{selectedFlight.aircraft.registration}-{selectedFlight.aircraft.type}</p>
                            </div>
                            <div className="col-md-6">
                                <h6>Remarks:</h6>
                                <p>{selectedFlight.remark}</p>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={triggerParentUpdate}>Close</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        <Link to="/edit" state={{selectedFlight}}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                    </Modal.Footer>
                </Modal.Dialog>
            )}
        </div>
    )
}

export default FlightInfo