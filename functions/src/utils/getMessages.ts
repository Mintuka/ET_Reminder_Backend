import { formatDistanceToNow } from "date-fns";

const admin = require('firebase-admin');

export async function getMessages (companyId:string) {
    let messages:any = []
    
    await admin.firestore().collection("ET_Reminders/" + companyId + "/Messages")
    .orderBy("time","desc")
    .limit(500)
    .get()
    .then((response:any) => {
        response.docs.forEach((doc:any, index:number) => {
            const messageData = doc.data()
            const startDate = new Date(messageData.time.seconds * 1000)
            const endDate = new Date()
            const isDay =  getTimeDifference(startDate, endDate) > 1
            
            let time = formatDistanceToNow((new Date(messageData.time.seconds * 1000))) + ' ago'

            let indexedData = { ...messageData, id:index+1, time }
            if ( isDay ) {
              time = new Date(messageData.time.seconds * 1000).toLocaleTimeString()
              const day  = new Date(messageData.time.seconds * 1000).toLocaleDateString()
              indexedData = { ...indexedData, day, time }
            }

            messages.push(indexedData)
          })
    });

    return messages
}

function getTimeDifference(startDate: Date, endDate: Date): number {
    console.log(startDate,endDate)
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
  
    const timeDifference = (endTime - startTime)
    const dayDifference = timeDifference/(1000 * 60 * 60 * 24)
    return dayDifference;
  }