
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_secret);

    req.user = { userId:payload.userID, name: payload.name };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication invalid" });
  }
};

export default auth;
