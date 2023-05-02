const axios = require('axios')


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiNllyb1lnZVd2VHNNR1JXQWxFQ0hXQTdsQmgyQ0ZuSFkiLCJleHAiOjE4NDAzNDYzMzEsImlhdCI6MTY4MjQ5MzUzMSwianRpIjoiOGE1Mzg5NTMtM2JkMy00OGJiLWJlNDgtZmE4NzBiNzM2NmI2In0.2Ud8yStKxRU3fLccO7aQom9OahY4yERZtXj5HsZppU0';
const identifierId = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
const senderName = 'SKIN CLUB';

const authAxios = axios.create({
    baseURL: 'https://api.afromessage.com/api/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export async function sendMessageToClient(data:any) {

    const { phoneNumber, message } = data;
    console.log('phoneNumber',phoneNumber)
    try {
      const response = await authAxios.get(`send?from=${identifierId}&sender=${senderName}&to=${phoneNumber}&message=${message}`)
  
      return response;
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