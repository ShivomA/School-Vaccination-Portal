exports.login = (req, res) => {
  const { username, password } = req.body;

  const isValidUser =
    typeof username === "string" &&
    typeof password === "string" &&
    /^admin\d{0,11}$/.test(username) &&
    password === "admin";

  if (!isValidUser) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Return dummy token
  const token = `${username}-auth-token`;
  res.json({ token });
};
