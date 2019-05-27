// Set the session in the local storage
export const setSession = (token: string, expiry: string): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiry", expiry);
};

// Clear the session from the local storage
export const clearSession = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
};

// Checks if the session is valid (locally) according to the expiration time
export const isSessionValid = (): boolean => {
  const expiry = localStorage.getItem("expiry");
  if (expiry) {
    return +new Date(expiry) > +new Date();
  }
  return false;
};

// Creates the authorization header using the bearer token
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
