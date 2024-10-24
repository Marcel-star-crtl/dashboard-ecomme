const userFromLocalStorage = localStorage.getItem("user");
const getTokenFromLocalStorage = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

export const config = {
  headers: {
    Authorization: getTokenFromLocalStorage && getTokenFromLocalStorage.token
      ? `Bearer ${getTokenFromLocalStorage.token}`
      : "",
    Accept: "application/json",
  },
};
