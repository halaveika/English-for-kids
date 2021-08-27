"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constanse_1 = require("../constanse");
const AuthMiddleware = (req, res, next) => {
    if (req.method === constanse_1.OPTIONS) {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get(constanse_1.SECRET_KEY));
        req.body = decoded;
        next();
    }
    catch (e) {
        return res.status(401).json({ message: 'Auth error' + e });
    }
};
exports.default = AuthMiddleware;
