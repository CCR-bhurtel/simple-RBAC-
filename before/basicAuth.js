function authUser(req, res, next) {
    if (!req.user) {
        return res.status(403).send('Not authenticated');
    }
    next();
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).send('Now allowed');
        }

        next();
    };
}
module.exports = { authUser, authRole };
