const admin = require('firebase-admin');

export async function updateDoc (companyId:string, customerId:string, data:any) {

    await admin.firestore()
                        .collection("ET_Reminders/" + companyId + "/Customers")
                        .doc(customerId)
                        .update(data);
}