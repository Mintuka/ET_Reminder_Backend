"use strict";
import { messageTemplate } from "./utils/dateTimeConverter";
import { sendMessageToClient } from "./utils/sendMessage";
import { updateDoc } from "./utils/updateDoc";
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.api = functions.https.onCall(async (data:any, context:any) => {
    const { time, date, phone, appointment, uid, companyId } = data
    const { message } = messageTemplate({time, date, appointment})
    const customer = { phoneNumber: phone, message: message }
    if ( message === null )
      return { message: 'Failed to send message' }
    const response = await sendMessageToClient(customer)
    await updateDoc(companyId, uid, { time: '-- : --' })
    return response
})

exports.setAppointments = functions.https.onCall(async (data:any, context:any) => {
  const { selectedCustomers, date, time, phase, companyId } = data
  for (const customerId of selectedCustomers) {
    await updateDoc(companyId, customerId, { date, time, phase })
  }
  return 
})

exports.createUser = functions.firestore
    .document('ET_Reminders/{companyId}/Customers/{id}')
    .onCreate(async(snap:any, context:any) => {
      let newValue = snap.data();
      const { phone, isSend } = newValue
      const companyId = context.params.companyId
      let message = ''
      if ( companyId === 'B2MWgnZZGwOgCj4ux1H0' && isSend ) {
        message = 'Dear esteemed customer, your booking is confirmed.Thank you for choosing our clinic. \n\n\n\n ዉድ ደንበኛችን የአገልግሎት ምዝገባዎ ተጠናቋል። ክሊኒካችንን  ስለመረጡ እናመሰግናለን።'
        newValue = { phoneNumber:phone, message }
        const response = await sendMessageToClient(newValue)
        return response
      }

      if ( companyId === 'Ml2dAHMamU1mh21YIFqC' && isSend ) {
        message = 'Dear esteemed customer, your booking is confirmed.Thank you for choosing our clinic. \n\n\n\n ዉድ ደንበኛችን የአገልግሎት ምዝገባዎ ተጠናቋል። ክሊኒካችንን  ስለመረጡ እናመሰግናለን።'
        newValue = { phoneNumber:phone, message }
        const response = await sendMessageToClient(newValue)
        return response
      }

      return null
});