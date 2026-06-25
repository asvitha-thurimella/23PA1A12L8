const axios = require("axios");

async function getToken() {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: "23pa1a12l8@vishnu.edu.in",
        name: "Thurimella Asvitha",
        rollNo: "23PA1A12L8",
        accessCode: "xgAsNC",
        clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
        clientSecret: "tVJaaaRBSExCRXeM"
      }
    );

    process.stdout.write(JSON.stringify(response.data, null, 2));
  } catch (error) {
    process.stdout.write(error.message);
  }
}

getToken();