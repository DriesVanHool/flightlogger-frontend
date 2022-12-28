import client from "./Client";

export function getFlights(){
    return client.get('flight')
}

export async function addFlight(flight){
    await client.post('flight', flight)
}

export async function deleteFlight(flightId){
    await client.delete(`flight/${flightId}`);
}


export async function updateFlight(flightId, flight){
    await client.put(`flight/${flightId}`, flight)
}