"use strict";
// backend/auth-service/src/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    await app.listen(4002); // IMPORTANT: this port must match admin-service .env
    //console.log('Auth-service running on http://localhost:4002');
}
bootstrap();
//# sourceMappingURL=main.js.map