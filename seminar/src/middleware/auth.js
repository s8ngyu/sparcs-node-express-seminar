const authMiddleware = (req, res, next) => {
    if (req.body.credential.id === process.env.USER_ID && req.body.credential.password === process.env.USER_PASSWORD) {
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;