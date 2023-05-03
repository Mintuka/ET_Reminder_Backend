"use strict";
import { messageTemplate } from "./utils/dateTimeConverter";
import { sendMessageToClient } from "./utils/sendMessage";

const functions = require('firebase-functions');

exports.api = functions.https.onCall(async (data:any, context:any) => {
    const { time, date, phone } = data
    const { message } = messageTemplate({time, date})
    const customer = { phoneNumber: phone, message: message }
    const response = await sendMessageToClient(customer)
    return response
})

exports.setAppointments = functions.https.onCall(async (data:any, context:any) => {
  const response = 'Update all docs'
  return response
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