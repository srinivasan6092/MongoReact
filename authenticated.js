const authenticated = (req, res, next) => {
  if (req.user) {
    // console.log(`user ==${req.user.userName}`);
    next();
  } else {
    res.redirect('/login');
  }
};

export default authenticated;
