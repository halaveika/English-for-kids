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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const fs_1 = __importDefault(require("fs"));
const Card = require('../models/card');
const Category = require('../models/category');
const constanse_1 = require("../constanse");
class CardController {
    getCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const number = req.query.number;
                const category = req.query.category;
                let cardArr = yield Card.find({ category: category });
                cardArr.splice(parseInt(number, 10), cardArr.length);
                const result = [];
                cardArr.forEach((element) => result.push({ word: element.word, translation: element.translation,
                    image: element.image, audioSrc: element.audioSrc, category: element.category }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Can not get cards" });
            }
        });
    }
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { word, category, translation, number } = req.body;
                const img = req.files.img;
                const audio = req.files.audio;
                const isInDB = yield Card.findOne({ word: word, category: category });
                if (isInDB !== null) {
                    throw new Error('Such word exist in this category');
                }
                const imgType = img.name.split('.').pop();
                const audioType = audio.name.split('.').pop();
                const pathImg = `img/${category.split(' ')[0]}-${word}.${imgType}`;
                img.mv((config_1.default.get(constanse_1.PATH_CONTENT) + pathImg), (err) => {
                    if (err) {
                        throw new Error('img not Uploaded');
                    }
                });
                const pathAudio = `audio/${category.split(' ')[0]}-${word}.${audioType}`;
                audio.mv((config_1.default.get(constanse_1.PATH_CONTENT) + pathAudio), (err) => {
                    if (err) {
                        throw new Error('audio not Uploaded');
                    }
                });
                const cardCategory = yield Category.findOne({ category: category });
                const newDBCard = new Card({
                    word: word,
                    translation: translation,
                    image: pathImg,
                    audioSrc: pathAudio,
                    category: category,
                });
                const newWordsNumber = cardCategory.wordsNumber + 1;
                yield Category.findOneAndUpdate({ category: category }, { wordsNumber: newWordsNumber });
                yield newDBCard.save();
                let cardArr = yield Card.find({ category: category });
                cardArr.splice(parseInt(number, 10), cardArr.length);
                const result = [];
                cardArr.forEach((element) => result.push({ word: element.word, translation: element.translation,
                    image: element.image, audioSrc: element.audioSrc, category: element.category }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Upload error" });
            }
        });
    }
    deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const number = req.query.number;
                const category = req.query.category;
                const word = req.query.word;
                const card = yield Card.findOne({ word: word, category: category });
                const parentCategory = yield Category.findOne({ category: category });
                if (!card) {
                    throw new Error('Card not found to delite');
                }
                fs_1.default.unlinkSync(config_1.default.get(constanse_1.PATH_CONTENT) + card.image);
                fs_1.default.unlinkSync(config_1.default.get(constanse_1.PATH_CONTENT) + card.audioSrc);
                yield Category.updateOne({ category: category }, { $pull: { data: mongoose_1.default.Types.ObjectId(`${card._id}`) } });
                yield card.remove();
                let cardArr = yield Card.find({ category: category });
                cardArr.splice(parseInt(number, 10), cardArr.length);
                const result = [];
                cardArr.forEach((element) => result.push({ word: element.word, translation: element.translation,
                    image: element.image, audioSrc: element.audioSrc, category: element.category }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'Cannot delete card' });
            }
        });
    }
    updateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { word, category, newWord, newTranslation, number } = req.body;
                const card = yield Card.findOne({ word: word, category: category });
                if (newWord !== '') {
                    yield card.updateOne({ word: newWord });
                }
                if (newTranslation !== '') {
                    yield card.updateOne({ translation: newTranslation });
                }
                if (req.files !== undefined && req.files !== null && req.files.img) {
                    const img = req.files.img;
                    fs_1.default.unlinkSync(config_1.default.get(constanse_1.PATH_CONTENT) + card.image);
                    const pathImg = `img/${category.split(' ')[0]}-${img.name}`;
                    img.mv((config_1.default.get(constanse_1.PATH_CONTENT) + pathImg), (err) => {
                        if (err) {
                            throw new Error('img not Uploaded');
                        }
                    });
                    yield card.updateOne({ image: pathImg });
                }
                if (req.files !== undefined && req.files !== null && req.files.audio) {
                    fs_1.default.unlinkSync(config_1.default.get(constanse_1.PATH_CONTENT) + card.audioSrc);
                    const audio = req.files.audio;
                    const pathAudio = `audio/${category.split(' ')[0]}-${audio.name}`;
                    audio.mv((config_1.default.get(constanse_1.PATH_CONTENT) + pathAudio), (err) => {
                        if (err) {
                            throw new Error('audio not Uploaded');
                        }
                    });
                    yield card.updateOne({ audioSrc: pathAudio });
                }
                let cardArr = yield Card.find({ category: category });
                cardArr.splice(parseInt(number, 10), cardArr.length);
                const result = [];
                cardArr.forEach((element) => result.push({ word: element.word, translation: element.translation,
                    image: element.image, audioSrc: element.audioSrc, category: element.category }));
                return res.send(result);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Upload error" });
            }
        });
    }
}
exports.default = new CardController();
