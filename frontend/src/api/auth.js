const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleLogin = async ({ username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const data = await response.json();
    return data.token; // This will be like "admin1-auth-token"
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
