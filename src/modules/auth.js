import JtockAuth from "j-tockauth";

let apiUrl = process.env.REACT_APP_AUTH_URL;

const auth = new JtockAuth({
  host: apiUrl,
  prefixUrl: "/api/v1",
});

const getAuthHeaders = () => {
  let headers = localStorage.getItem("J-tockAuth-Storage");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };
  return headers;
};

const persistLogin = async (dispatch) => {
  if (localStorage.getItem("J-tockAuth-Storage")) {
    let credentials = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    const response = await auth.validateToken(credentials);

    if (response.success) {
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: response.success,
          currentUser: response.data,
        },
      });
    } else {
      console.log(response);
    }
  }
};

export { auth, getAuthHeaders, persistLogin };
