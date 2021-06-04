import axios from "axios";

const isBrowser = typeof window !== "undefined";
const contentType = { "Content-Type": "application/json" };

export const signUp = (user) => {
  return axios
    .post("/signup", user, { headers: contentType })
    .then(({ data }) => {
      return data;
    });
};

export const signIn = (user) => {
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

export const signOut = () => {
  if (isBrowser) {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];

    return axios.get("/signout").then(({ data }) => {
      return data;
    });
  }
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return false;
  }

  if (isBrowser && localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
