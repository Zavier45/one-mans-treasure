const _apiURL = "/api/auth";

export const login = (email, password) => {
  return fetch(_apiURL + "/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = () => {
  return fetch(_apiURL + "/logout");
};

export const tryGetLoggedInUser = () => {
  return fetch(_apiURL + "/me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch(_apiURL + "/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then((res) => {
    if (res.ok) {
      return fetch(_apiURL + "/me").then((res) => res.json());
    } else if (res.status === 400) {
      return res.json();
    } else {
      return Promise.resolve({ errors: ["Unknown registration error"] });
    }
  });
};
