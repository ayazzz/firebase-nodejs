const firebase = require("./firebase/admin");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then((decodeToken) => {
      //console.log("decodeToken:", decodeToken);
      const uid = decodeToken.uid;
      firebase
        .auth()
        .getUser(uid)
        .then((userRecord) => {
          //console.log("userRecord:", userRecord);
          if (!userRecord.emailVerified) {
            return response.status(401).json({ message: "Email is not verified" });
          }

          if (userRecord.disabled) {
            return response.status(401).json({ message: "This account has been disabled" });
          }

          //bind token data to req.user
          request.user = userRecord;
          next();
        })
        .catch((err) => {
          console.log("catch:1");
          console.log(err);
          response.status(403).json({ message: "Could not authorize" })
        });
    })
    .catch((err) => {
      console.log("catch:2");
      console.log(err);
      response.status(403).json({ message: "Could not authorize" })
    });
}

module.exports = authMiddleware;
