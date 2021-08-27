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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import cors from 'cors';
const body_parser_1 = __importDefault(require("body-parser"));
const constanse_1 = require("./constanse");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const cardRoute_1 = __importDefault(require("./routes/cardRoute"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_fileupload_1.default({}));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/auth', authRoute_1.default);
app.use('/api/category', categoryRoute_1.default);
app.use('/api/card', cardRoute_1.default);
const PORT = config_1.default.get(constanse_1.SERVER_PORT);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.get(constanse_1.DB_URL), { useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
