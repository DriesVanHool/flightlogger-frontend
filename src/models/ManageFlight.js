export default class ManageFlight{
    constructor(departureTime, departureAirportId, arrivalTime, arrivalAirportId, aircraftId, remark) {
        this.departureTime = departureTime
        this.departureAirportId = departureAirportId
        this.arrivalTime = arrivalTime
        this.arrivalAirportId = arrivalAirportId
        this.aircraftId = aircraftId
        this.remark = remark
    }
}