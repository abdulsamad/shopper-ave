import axios from "axios";

axios.defaults.baseURL = process.env.GATSBY_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const contentType = { "Content-Type": "application/json" };
const isBrowser = typeof window !== "undefined";

const signUp = (user) => {
  return axios
    .post("/signup", user, { headers: contentType })
    .then(({ data }) => {
      return data;
    });
};

const signIn = (user) => {
  return axios
    .post("/signin", user, { headers: contentType })
    .then(({ data }) => {
      const { token } = data;

      if (isBrowser) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("jwt", JSON.stringify(data));
      }

      return data;
    });
};

const signOut = () => {
  if (isBrowser) {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];

    return axios.get("/signout").then(({ data }) => {
      return data;
    });
  }
};

const isAuthenticated = () => {
  if (!isBrowser) {
    return false;
  }

  if (isBrowser && localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export { signUp, signIn, signOut, isAuthenticated };
