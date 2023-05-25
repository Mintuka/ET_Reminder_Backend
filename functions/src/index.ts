"use strict";
import { addCustomer } from "./utils/addCustomer";
import { messageTemplate } from "./utils/dateTimeConverter";
import { getCustomersData } from "./utils/getCustomersData";
import { getMessages } from "./utils/getMessages";
import { getStatistics } from "./utils/getStatistics";
import { sendMessageToClient } from "./utils/sendMessage";
import { sendStatus } from "./utils/status";
import { updateDoc } from "./utils/updateDoc";
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.api = functions.https.onCall(async (data:any, context:any) => {
    // const { time, date, phone, appointment, uid, companyId } = data
    const { time, date, phone, appointment, companyId } = data
    const { message } = messageTemplate({time, date, appointment})
    const customer = { phoneNumber: phone, message: message, companyId }
    if ( message === null )
      return { message: 'Failed to send message' }
    const response = await sendMessageToClient(customer)
    // data = { time: '-- : --' }
    // await updateDoc(companyId, uid, data )
    return response
})

exports.setAppointments = functions.https.onCall(async (data:any, context:any) => {
  const { selectedCustomers, date, time, phase, companyId } = data
  for (const customerId of selectedCustomers) {
    await updateDoc(companyId, customerId, { date, time, phase })
  }
  return 
})

exports.sendMessage = functions.https.onCall(async (data:any, context:any) => {
  const { phoneNumber, message, companyId } = data
  if ( message === null )
    return { message: 'Failed to send message' }
  const response = await sendStatus({ message, phoneNumber, companyId })
  return response
})

exports.getMessages = functions.https.onCall(async (data:any, context:any) => {
  const { companyId } = data
  return await getMessages(companyId)
})

exports.getStatistics = functions.https.onCall(async (data:any, context:any) => {
  const { companyId } = data
  return await getStatistics(companyId)
})

exports.getStatus = functions.https.onRequest(async (req:any, res:any) => {

  const uid = 'h1kWHWdmV9VL3wyO3ydYRFWM7D73';
  const companyId = 'B2MWgnZZGwOgCj4ux1H0';
  const idPrefix = 'SK-CL-10'
  
  admin.auth().setCustomUserClaims(uid, { companyId, idPrefix })
    .then(() => {
      console.log('Custom claim set successfully');
    })
    .catch((error:any) => {
      console.error('Error setting custom claim:', error);
    });
  return res
})

exports.addCustomer = functions.https.onCall(async (data:any, context:any) => {
  const { companyId, customer } = data
  return await addCustomer( companyId, customer )
})

exports.getCustomersData = functions.https.onCall(async (data:any, context:any) => {
  const { companyId } = data
  const res = await getCustomersData( companyId )
  console.log('res',res)
  return res
})

exports.createUser = functions.firestore
    .document('ET_Reminders/{companyId}/Customers/{id}')
    .onCreate(async(snap:any, context:any) => {
      let newValue = snap.data();
      const { phone, isSend } = newValue
      const companyId = context.params.companyId
      let message = ''
      if ( companyId === 'B2MWgnZZGwOgCj4ux1H0' && isSend ) {
        message = 'Dear esteemed customer, your booking is confirmed.Thank you for choosing our clinic. \r\n ዉድ ደንበኛችን የአገልግሎት ምዝገባዎ ተጠናቋል። ክሊኒካችንን  ስለመረጡ እናመሰግናለን።'
        newValue = { phoneNumber:phone, message, companyId }
        const response = await sendMessageToClient(newValue)
        return response
      }

      if ( companyId === 'Ml2dAHMamU1mh21YIFqC' && isSend ) {
        message = 'Dear esteemed customer, your booking is confirmed.Thank you for choosing our clinic. \r\n ዉድ ደንበኛችን የአገልግሎት ምዝገባዎ ተጠናቋል። ክሊኒካችንን  ስለመረጡ እናመሰግናለን።'
        newValue = { phoneNumber:phone, message, companyId }
        const response = await sendMessageToClient(newValue)
        return response
      }

      return null
});