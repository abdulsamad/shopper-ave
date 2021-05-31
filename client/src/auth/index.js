import axios from "axios";

axios.defaults.baseURL = process.env.GATSBY_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const contentType = { "Content-Type": "application/json" };

const signUp = (user) => {
  return axios
    .post("/signup", user, { headers: contentType })
    .then(({ data }) => {
      const { token } = data;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(data);
    });
};

const signIn = (user) => {
  axios.post("/signin", user, { headers: contentType }).then(({ data }) => {
    const { token } = data;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(data);
  });
};

const signOut = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
    next();

    return axios.get("/signout").then(({ data }) => {
      console.log(data);
    });
  }
};

const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
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

export { signUp, signIn, authenticate, signOut, isAuthenticated };
