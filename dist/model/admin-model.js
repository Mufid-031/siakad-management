"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAdminResponse = toAdminResponse;
function toAdminResponse(admin) {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
        message: admin.message
    };
}
