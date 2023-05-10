const admin = require('firebase-admin');

export async function createMessage (companyId:string, data:any) {
    return await admin.firestore()
                    .collection("ET_Reminders/" + companyId + "/Messages")
                    .add(data)
}