import jwt from 'jsonwebtoken';
import sCode from "../custom/status-codes";
const { bad_request, un_authorized } = sCode;

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader === 'undefined') return res.status(bad_request).send({ message: "Access Token not found" });
    const accessToken = authHeader && authHeader.split(' ')[1];
    // console.log(accessToken);
    if (accessToken == undefined || accessToken == null) return res.status(un_authorized).send({ message: "Token is blank"});
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) return res.status(un_authorized).send({ message: "Invalid access token or token expired", error: err });
        Object.assign(req, { accessToken, authData });
        next();
    });
}