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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const userRepository = {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
        });
    },
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.create({
                data,
            });
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.delete({
                where: {
                    id,
                },
            });
        });
    },
};
exports.default = userRepository;
