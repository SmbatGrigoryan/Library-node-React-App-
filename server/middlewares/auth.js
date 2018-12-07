const User = require('.././models/userModel');

const auth = (req, res, next) => {
  let tokenFromBrowserCookie = req.cookies.auth;

  User.findByToken(tokenFromBrowserCookie, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ error: true});

    req.token = tokenFromBrowserCookie;
    req.user = user;
    next();
  })
};

module.exports = auth;