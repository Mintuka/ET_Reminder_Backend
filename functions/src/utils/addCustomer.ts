const admin = require('firebase-admin');

export async function addCustomer (companyId:string, customer:any) {
    const { phone } = customer
    let isCustomerRegistered = false
    await admin.firestore().collection("ET_Reminders/" + companyId + "/Customers")
    .where("phone", "==", phone).limit(1)
    .get()
    .then((querySnapshot:any) => {
        console.log('querySnapshot',querySnapshot)
        if (!querySnapshot.empty) {
            isCustomerRegistered = true
        } 
    })
    .catch((error:any) => {
        console.log("Error getting customer:", error);
    });

    if ( isCustomerRegistered )
        return { isCustomerRegistered }

    await admin.firestore()
                    .collection("ET_Reminders/" + companyId + "/Customers")
                    .add(customer)
    return { customer }         
}