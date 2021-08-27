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
const fs_1 = __importDefault(require("fs"));
const Category = require('../models/category');
const Card = require('../models/card');
class CategoryController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category.find({});
                const cards = yield Card.find({});
                const result = [];
                categories.forEach((element) => {
                    const filterCards = [];
                    cards.forEach((item) => {
                        if (element.category === item.category) {
                            filterCards.push({ word: item.word, translation: item.translation, image: item.image, audioSrc: item.audioSrc });
                        }
                        ;
                    });
                    result.push({ category: element.category, data: filterCards });
                });
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Can not get content" });
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const number = req.query.number;
                let categoryArr = yield Category.find({});
                categoryArr.splice(parseInt(number, 10), categoryArr.length);
                const result = [];
                categoryArr.forEach((element) => result.push({ category: element.category, wordsNumber: element.wordsNumber }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Can not get category" });
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, number } = req.body;
                const isInDB = yield Category.findOne({ category: title });
                if (isInDB !== null) {
                    throw new Error('Such category exist');
                }
                const category = new Category({ category: title, wordsNumber: 0 });
                yield category.save();
                let categoryArr = yield Category.find({});
                categoryArr.splice(parseInt(number, 10), categoryArr.length);
                const result = [];
                categoryArr.forEach((element) => result.push({ category: element.category, wordsNumber: element.wordsNumber }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, number } = req.body;
                const category = yield Category.findOne({ category: title });
                if (!category) {
                    return res.status(400).json({ message: 'category not found' });
                }
                const cards = yield Card.find({ category: title });
                cards.forEach((card) => __awaiter(this, void 0, void 0, function* () {
                    fs_1.default.unlinkSync(card.image);
                    fs_1.default.unlinkSync(card.audioSrc);
                }));
                yield Card.deleteMany({ category: title });
                yield Category.deleteOne(category);
                let categoryArr = yield Category.find({});
                categoryArr.splice(parseInt(number, 10), categoryArr.length);
                const result = [];
                categoryArr.forEach((element) => result.push({ category: element.category, wordsNumber: element.wordsNumber }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'category was not deleted' });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, newTitle, number } = req.body;
                const category = yield Category.findOne({ category: title });
                if (!category) {
                    return res.status(400).json({ message: 'category not found' });
                }
                const cards = yield Card.find({ category: title });
                cards.forEach((element) => { Card.findOneAndUpdate({ category: element.category }, { category: newTitle }); });
                yield category.updateOne({ category: newTitle });
                let categoryArr = yield Category.find({});
                categoryArr.splice(parseInt(number, 10), categoryArr.length);
                const result = [];
                categoryArr.forEach((element) => result.push({ category: element.category, wordsNumber: element.wordsNumber }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: e });
            }
        });
    }
}
exports.default = new CategoryController();
