"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CardSchema = new mongoose_1.Schema({
    word: { type: String, required: true },
    translation: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    audioSrc: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    trainCount: { type: Number, required: true, default: 0 },
    successCount: { type: Number, required: true, default: 0 },
    failCount: { type: Number, required: true, default: 0 },
    percentSuccess: { type: Number, required: true, default: 0 },
});
module.exports = mongoose_1.default.model('Card', CardSchema);
