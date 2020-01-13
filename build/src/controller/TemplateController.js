"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Template_1 = require("../entity/Template");
const class_validator_1 = require("class-validator");
class TemplateController {
    constructor() {
        this.templateRepository = typeorm_1.getRepository(Template_1.Template);
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = new Template_1.Template();
            template.name = request.body.name;
            template.description = request.body.description;
            template.radRequest = request.body.radRequest;
            const errors = yield class_validator_1.validate(template);
            if (errors.length > 0) {
                response.status(400).send(errors);
            }
            else {
                const result = yield this.templateRepository.save(template);
                return result;
            }
        });
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.templateRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.templateRepository.findOne(request.params.id);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let templateToRemove = yield this.templateRepository.findOne(request.params.id);
            yield this.templateRepository.remove(templateToRemove);
        });
    }
}
exports.TemplateController = TemplateController;
//# sourceMappingURL=TemplateController.js.map