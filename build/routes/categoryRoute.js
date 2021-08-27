"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const categoryRoute = express_1.Router();
categoryRoute.get('/content', categoryController_1.default.getData);
categoryRoute.post('', categoryController_1.default.createCategory);
categoryRoute.get('', categoryController_1.default.getCategory);
categoryRoute.put('', categoryController_1.default.updateCategory);
categoryRoute.delete('', categoryController_1.default.deleteCategory);
exports.default = categoryRoute;
