export const handleLogin = async ({ username, password }) => {
  if (/^admin\d{0,11}$/.test(username) && password === "admin") {
    return `${username}-auth-token`;
  }

  return null;
};
