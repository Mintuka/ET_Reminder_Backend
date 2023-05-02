"use strict";
import { sendMessageToClient } from "./sendMessage";

// const express = require('express');
// const cors = require('cors');
const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// const app = express();
// app.use(cors({ origin: true }));

// admin.initializeApp();

// app.get('/test', function (request: any, response: any) {
//   response.send({ success: 'Hi' });
// });

// app.post('/send-message', async (req:any, res:any) => {

//   })

exports.api = functions.https.onCall(async (data:any, context:any) => {
    const response = await sendMessageToClient(data)
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