"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../../middlewares/authMiddleware"));
const roleMiddleware_1 = __importDefault(require("../../../middlewares/roleMiddleware"));
const sanitize_1 = require("../../../middlewares/sanitize");
const responseController_1 = __importDefault(require("../controllers/responseController"));
const responseValidation_1 = require("../validation/responseValidation");
const router = (0, express_1.Router)();
router.post("/:surveyId", (0, sanitize_1.sanitize)(responseValidation_1.createResponseSchema), responseController_1.default.create);
router.get("/", authMiddleware_1.default, (0, roleMiddleware_1.default)("ADMIN"), responseController_1.default.getAll);
router.get("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)("ADMIN"), responseController_1.default.getById);
router.patch("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)("ADMIN"), (0, sanitize_1.sanitize)(responseValidation_1.updateResponseSchema), responseController_1.default.update);
router.delete("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)("ADMIN"), responseController_1.default.remove);
exports.default = router;
