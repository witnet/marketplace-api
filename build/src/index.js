"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
app_1.getApp()
    .then(app => {
    app.express.listen(process.env.PORT || 3000);
    console.log(`Express server has started on port ${process.env.PORT || 3000}. Open http://localhost:3000/templates to see results`);
})
    .catch(error => console.log(error));
//# sourceMappingURL=index.js.map