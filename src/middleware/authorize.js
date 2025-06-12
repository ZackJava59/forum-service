export function authorize({roles = [], condition = null}) {
    return (req, res, next) => {
        const userRoles = req.principal?.roles || [];

        const hasRole = roles.some(role => userRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({message: 'Access denied: role'});
        }

        if (condition && !condition(req)) {
            return res.status(403).json({message: 'Access denied: condition'});
        }

        next();
    };
}