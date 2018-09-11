export const setSession = (token: string, expiry: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

export const clearSession = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

export const isSessionValid = (): boolean => {
  const expiry = localStorage.getItem('expiry');
  if (expiry) {
    return +new Date(expiry) > +new Date();
  }
  return false;
};

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});
