const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded; // Save decoded data to request for later use
    next();
  });
};

module.exports = verifyToken;
