const admin = require('firebase-admin');

export async function getCustomersData (companyId:string) {

    let customers:any = []
    let phases:any = []

    await admin.firestore().collection("ET_Reminders/" + companyId + "/Customers")
    .get()
    .then((response:any) => {
        response.docs.forEach((doc:any) => {
            let customer = doc.data()
            customer = { ...customer, uid: doc.id }
            customers.push(customer)
          })
    });

    await admin.firestore().collection("ET_Reminders/" + companyId + "/Phases")
    .get()
    .then((response:any) => {
        response.docs.forEach((doc:any) => {
            let phase = doc.data()
            phase = { ...phase, 
                        order: phase.order === Infinity || phase.order === undefined ? '-' : phase.order,
                        uid: doc.id }
            phases.push(phase)
          })
    });

    return { customers, phases }
}