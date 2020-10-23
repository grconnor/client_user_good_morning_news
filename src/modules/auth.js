import JtockAuth from "j-tockauth";

// let apiUrl;
// if (process.env.NODE_ENV === "production") {
//   apiUrl = "https://good-morning-news-team1.herokuapp.com/";
// } else {
//   apiUrl = "http://localhost:3000";
// }
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

export { auth, getAuthHeaders };
