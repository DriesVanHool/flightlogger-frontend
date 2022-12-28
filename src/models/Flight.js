export default class Flight{
    constructor(id, departureTime, departureAirport, arrivalTime, arrivalAirport, aircraft, remark) {
        this.id = id
        this.departureTime = departureTime
        this.departureAirport = departureAirport
        this.arrivalTime = arrivalTime
        this.arrivalAirport = arrivalAirport
        this.aircraft = aircraft
        this.remark = remark
    }
}