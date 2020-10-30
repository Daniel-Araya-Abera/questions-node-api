module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        console.log("not authenticated, redirecting to login");
        res.redirect("/users/login");
    }
}