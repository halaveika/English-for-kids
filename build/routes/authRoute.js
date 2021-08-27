"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constanse_1 = require("../constanse");
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const authRoute = express_1.Router();
authRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (login !== config_1.default.get(constanse_1.LOGIN)) {
            console.log(req.body);
            return res.status(404).json({ message: `User ${login} not found ` });
        }
        if (password !== config_1.default.get(constanse_1.PASSWORD)) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: config_1.default.get(constanse_1.LOGIN) }, config_1.default.get(constanse_1.SECRET_KEY), { expiresIn: "1h" });
        return res.json({
            token,
            user: {
                id: login,
            }
        });
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Server error" });
    }
}));
authRoute.get('/auth', AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body;
        if (userId.user.id !== config_1.default.get(constanse_1.LOGIN)) {
            throw new Error('bad userId');
        }
        const token = jsonwebtoken_1.default.sign({ id: userId.user.id }, config_1.default.get(constanse_1.SECRET_KEY), { expiresIn: "1h" });
        return res.json({
            token,
            user: {
                id: userId,
            }
        });
    }
    catch (e) {
        console.log(e);
        res.send({ message: e });
    }
}));
exports.default = authRoute;
