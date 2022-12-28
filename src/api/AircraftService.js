import client from "./Client";

export function getAircrafts(){
    return client.get('aircraft')
}