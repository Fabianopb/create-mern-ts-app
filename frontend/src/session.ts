export const setSession = (token: string, expiry: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

export const clearSession = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

export const isSessionValid = (): boolean => {
  return true;
  // return moment(localStorage.getItem('expiry') as string).isAfter(moment());
};
