"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateController_1 = require("./controller/TemplateController");
exports.Routes = [
    {
        method: 'post',
        route: '/templates',
        controller: TemplateController_1.TemplateController,
        action: 'save'
    },
    {
        method: 'get',
        route: '/templates',
        controller: TemplateController_1.TemplateController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/templates/:id',
        controller: TemplateController_1.TemplateController,
        action: 'one'
    },
    {
        method: 'delete',
        route: '/templates/:id',
        controller: TemplateController_1.TemplateController,
        action: 'remove'
    }
];
//# sourceMappingURL=routes.js.map