import jwt = require('jsonwebtoken');
import { Request } from 'express';


const checkAuth = (req: Request) => {
    const token = req.header('auth-token');
    if (!token) {
        return;
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        return decodedToken;
        
    } catch (error) {
        return;
    }
}

module.exports.checkAuth = checkAuth;