"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkRole_1 = require("../Users/checkRole");
var populateUser_1 = require("./hooks/populateUser");
var revalidatePost_1 = require("./hooks/revalidatePost");
var Comments = {
    slug: 'comments',
    admin: {
        useAsTitle: 'comment',
        preview: function (comment) {
            var _a;
            return "".concat(process.env.PAYLOAD_PUBLIC_SERVER_URL, "/posts/").concat((comment === null || comment === void 0 ? void 0 : comment.doc) && typeof (comment === null || comment === void 0 ? void 0 : comment.doc) === 'object' ? (_a = comment === null || comment === void 0 ? void 0 : comment.doc) === null || _a === void 0 ? void 0 : _a.slug : comment === null || comment === void 0 ? void 0 : comment.doc);
        },
    },
    hooks: {
        afterChange: [revalidatePost_1.revalidatePost],
        afterRead: [populateUser_1.populateUser],
    },
    access: {
        // Public users should only be able to read published comments
        // Users should be able to read their own comments
        // Admins should be able to read all comments
        read: function (_a) {
            var _b;
            var data = _a.data, user = _a.req.user;
            return Boolean((data === null || data === void 0 ? void 0 : data.status) === 'published' ||
                (0, checkRole_1.checkRole)(['admin'], user) ||
                (typeof (data === null || data === void 0 ? void 0 : data.user) === 'string' ? data === null || data === void 0 ? void 0 : data.user : (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.id) === (user === null || user === void 0 ? void 0 : user.id));
        },
        // Public users should not be able to create published comments
        // User should only be allowed to create and their own draft comments
        // Admins should have full control
        create: function (_a) {
            var _b;
            var data = _a.data, user = _a.req.user;
            return Boolean((0, checkRole_1.checkRole)(['admin'], user) ||
                ((data === null || data === void 0 ? void 0 : data.status) === 'draft' &&
                    (typeof (data === null || data === void 0 ? void 0 : data.user) === 'string' ? data === null || data === void 0 ? void 0 : data.user : (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.id) === (user === null || user === void 0 ? void 0 : user.id)));
        },
        // Public users should not be able to update published comments
        // Users should only be allowed to update their own draft comments
        // Admins should have full control
        update: function (_a) {
            var _b;
            var data = _a.data, user = _a.req.user;
            return Boolean((0, checkRole_1.checkRole)(['admin'], user) ||
                ((data === null || data === void 0 ? void 0 : data.status) === 'draft' &&
                    (typeof (data === null || data === void 0 ? void 0 : data.user) === 'string' ? data === null || data === void 0 ? void 0 : data.user : (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.id) === (user === null || user === void 0 ? void 0 : user.id)));
        },
        // Only admins can delete comments
        delete: function (_a) {
            var user = _a.req.user;
            return (0, checkRole_1.checkRole)(['admin'], user);
        },
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            hasMany: false,
        },
        // This field is only used to populate the user data via the `populateUser` hook
        // This is because the `user` collection has access control locked to protect user privacy
        // GraphQL will also not return mutated user data that differs from the underlying schema
        {
            name: 'populatedUser',
            type: 'group',
            admin: {
                readOnly: true,
                disabled: true,
            },
            access: {
                update: function () { return false; },
            },
            fields: [
                {
                    name: 'id',
                    type: 'text',
                },
                {
                    name: 'name',
                    type: 'text',
                },
            ],
        },
        {
            name: 'doc',
            type: 'relationship',
            relationTo: 'posts',
            hasMany: false,
        },
        {
            name: 'comment',
            type: 'textarea',
        },
    ],
};
exports.default = Comments;
//# sourceMappingURL=index.js.map