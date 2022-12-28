import client from "./Client";

export function getAirports(){
    return client.get('airport')
}