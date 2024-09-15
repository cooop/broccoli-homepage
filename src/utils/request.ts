import axios, { isAxiosError } from "axios";

const baseUrl =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod";

export const validateInvite = async (name: string, email: string) => {
  try {
    const res = await axios.post(`${baseUrl}/fake-auth`, {
      name,
      email,
    });
    if (res.data === "Registered") {
      return { success: true };
    }
    return { success: false, message: res.data };
  } catch (e) {
    console.error(e);
    let message = "";
    if (isAxiosError(e)) {
      if (e.response) {
        // not 200 response
        message = e.response.data.errorMessage;
      } else if (e.request) {
        // no response
        message = "No response received:" + e.message;
      } else {
        // other errors
        message = "Other error:" + e.message;
      }
    } else {
      // not an Axios error
      message = "Unknown error:" + e;
    }
    return { success: false, message };
  }
};
