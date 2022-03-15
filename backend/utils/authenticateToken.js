function authenticateToken(req, res, next) {
  const suthHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(
    token,
    "3396C4506F0EBBD37679396EA5554A02B23A6AA4C775ABCF68CDF45FC915A555",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}
module.exports = authenticateToken;
