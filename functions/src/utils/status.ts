import { createMessage } from "./createMessage";

const axios = require('axios')


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiNllyb1lnZVd2VHNNR1JXQWxFQ0hXQTdsQmgyQ0ZuSFkiLCJleHAiOjE4NDAzNDYzMzEsImlhdCI6MTY4MjQ5MzUzMSwianRpIjoiOGE1Mzg5NTMtM2JkMy00OGJiLWJlNDgtZmE4NzBiNzM2NmI2In0.2Ud8yStKxRU3fLccO7aQom9OahY4yERZtXj5HsZppU0';
const identifierId = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
const senderName = 'SKIN CLUB';
// const callback = 'https://us-central1-reminder-et.cloudfunctions.net/getStatus'

const authAxios = axios.create({
    baseURL: 'https://api.afromessage.com/api/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export async function sendStatus(data:any) {
    const { phoneNumber, message, companyId } = data;
    // const { phoneNumber, message } = data;
    
    try {
      // const response = await authAxios.get(`send?from=${identifierId}&sender=${senderName}&to=${phoneNumber}&message=${message}&callback=${callback}`)
      await authAxios.get(`send?from=${identifierId}&sender=${senderName}&to=${phoneNumber}&message=${message}`)
      // const { acknowledge } = response
      await createMessage(companyId, { phone:phoneNumber, time: new Date(), message })
      return { acknowledge: 'sent successfully' }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }