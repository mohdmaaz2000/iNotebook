const jwt = require('jsonwebtoken');
const JWT_TOKEN = "Mynameismaaz";

const fetchUser = (req, res, next) => {
    //    Get the user from the jwt Token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please enter the valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please enter the valid token" });
    }

}

module.exports = fetchUser;