import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getAirports} from "../api/AirportService";
import {getAircrafts} from "../api/AircraftService";
import {addFlight, updateFlight} from "../api/FlightService";

function ManageFlight() {
    const location = useLocation();
    const selectedFlight = location.state?.selectedFlight;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const defaultFormFields = selectedFlight ? {
        departureTime: selectedFlight.departureTime,
        departureAirportId: selectedFlight.departureAirport.id,
        arrivalTime: selectedFlight.arrivalTime,
        arrivalAirportId: selectedFlight.arrivalAirport.id,
        aircraftId: selectedFlight.aircraft.id,
        remark: selectedFlight.remark
    } : {
        departureTime: '',
        departureAirportId: '',
        arrivalTime: '',
        arrivalAirportId: '',
        aircraftId: '',
        remark: ''
    }
    const [formValue, setFormValue] = useState(defaultFormFields)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue(
            {
                ...formValue,
                [name]: value
            }
        )
    }

    const [airports, setAirports] = useState([]);
    const [aircrafts, setAircrafts] = useState([]);

    useEffect(() => {
        updateForm()
    }, []);

    function printErrors(errors){
        let result = ""
        for (const key in errors) {
            result+=`${errors[key]} | `;
        }
        return result
    }

    function updateForm() {
        getAirports().then((result) => setAirports(result.data))
        getAircrafts().then((result) => setAircrafts(result.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addFlight({...formValue}).then(() => navigate('/', {replace: true}), [navigate]).catch((error) => setErrorMessage(printErrors(error.response.data.details)))
    }
    const updateSubmit = (e) =>{
        e.preventDefault()
        updateFlight(selectedFlight.id, {...formValue}).then(() => navigate('/', {replace: true}), [navigate]).catch((error) => setErrorMessage(printErrors(error.response.data.details)))
    }

    return (
        <Form>
            {errorMessage && (
                <>
                    <br/>
                    <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                        <p>{errorMessage}</p>
                    </Alert>
                </>
            )}
            {
                (airports.length > 0 && aircrafts.length > 0) ?
                    <Form.Group className="container-fluid" id="flightManagement">
                        <Form.Group className="row mb-3">
                            <div className="col-md-6">
                                <Form.Label className="text-muted">Airport</Form.Label>
                                <Form.Select name="departureAirportId" onChange={handleChange}
                                             value={formValue.departureAirportId}>
                                    <option>Departure</option>
                                    {
                                        airports.map((airport) => (
                                            <option key={airport.id} value={airport.id}>{airport.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div className="col-md-6">
                                <Form.Label className="text-muted">Time</Form.Label>
                                <Form.Control name="departureTime" type="datetime-local" onChange={handleChange}
                                              value={formValue.departureTime}/>
                            </div>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <div className="col-md-6">
                                <Form.Select name="arrivalAirportId" onChange={handleChange}
                                             value={formValue.arrivalAirportId}>
                                    <option>Arrival</option>
                                    {
                                        airports.map((airport) => (
                                            <option key={airport.id} value={airport.id}>{airport.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div className="col-md-6">
                                <Form.Control name="arrivalTime" type="datetime-local" onChange={handleChange}
                                              value={formValue.departureTime}/>
                            </div>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <div className="col-md-6">
                                <Form.Label className="text-muted">Aircraft</Form.Label>
                                <Form.Select name="aircraftId" onChange={handleChange}
                                             value={formValue.aircraftId}>
                                    <option>-</option>
                                    {
                                        aircrafts.map((aircraft) => (
                                            <option key={aircraft.id}
                                                    value={aircraft.id}>{aircraft.registration}-{aircraft.type}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <div className="col-md-12">
                                <Form.Label className="text-muted">Remark</Form.Label>
                                <Form.Control as="textarea" rows={5} name="remark" onChange={handleChange}
                                              value={formValue.remark}/>
                            </div>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <div className="col-md-12" align="right">
                                <Link to="/">
                                    <Button variant="secondary">
                                        Cancel
                                    </Button>
                                </Link>
                                {
                                    selectedFlight ? (
                                        <Button variant="primary" type="submit"
                                                onClick={(event) => updateSubmit(event)}>
                                            Update
                                        </Button>
                                    ) : <Button variant="primary" type="submit"
                                                onClick={(event) => handleSubmit(event)}>
                                        Confirm
                                    </Button>
                                }
                            </div>
                        </Form.Group>
                    </Form.Group>
                    : <div className="loader d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
            }
        </Form>
    )
}

export default ManageFlight;