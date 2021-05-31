import axios from "axios";

axios.defaults.baseURL = process.env.GATSBY_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const contentType = { "Content-Type": "application/json" };

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

      if (typeof window !== undefined) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("jwt", JSON.stringify(data));
      }

      return data;
    });
};

const signOut = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];

    return axios.get("/signout").then(({ data }) => {
      return data;
    });
  }
};

const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export { signUp, signIn, signOut, isAuthenticated };
