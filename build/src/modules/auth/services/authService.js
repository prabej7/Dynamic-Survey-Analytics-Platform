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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const AppError_1 = require("../../../utils/AppError");
const jwtUtil_1 = require("../../../utils/jwtUtil");
const authService = {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository_1.default.findByEmail(data.email);
            if (existingUser) {
                throw new AppError_1.ConflictError("Email is already registered");
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 12);
            const user = yield userRepository_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const token = (0, jwtUtil_1.generateToken)({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            const { password: _ } = user, safeUser = __rest(user, ["password"]);
            return {
                user: safeUser,
                token,
            };
        });
    },
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findByEmail(email);
            if (!user) {
                throw new AppError_1.UnauthorizedError("Invalid email or password");
            }
            const valid = yield bcrypt_1.default.compare(password, user.password);
            if (!valid) {
                throw new AppError_1.UnauthorizedError("Invalid email or password");
            }
            const token = (0, jwtUtil_1.generateToken)({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            const { password: _ } = user, safeUser = __rest(user, ["password"]);
            return {
                user: safeUser,
                token,
            };
        });
    },
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findById(id);
            if (!user) {
                throw new AppError_1.NotFoundError("User not found");
            }
            const { password } = user, safeUser = __rest(user, ["password"]);
            return safeUser;
        });
    },
};
exports.default = authService;
