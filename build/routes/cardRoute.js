"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = __importDefault(require("../controllers/cardController"));
const cardRoute = express_1.Router();
cardRoute.post('/upload', cardController_1.default.createCard);
cardRoute.get('', cardController_1.default.getCard);
cardRoute.put('/upload', cardController_1.default.updateCard);
cardRoute.delete('', cardController_1.default.deleteCard);
exports.default = cardRoute;
