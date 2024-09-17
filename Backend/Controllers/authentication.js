const Authenticate = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
  
    jwt.verify(token, process.env.SECRET_STR, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = decoded.id;
      // next();
    });
    // console.log("verify token : " +token)
    res.status(200).json({
      status: "success",
      token: token,
    });
    next
  };
  