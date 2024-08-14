"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateArchiveBlock = void 0;
var adminsOrPublished_1 = require("../access/adminsOrPublished");
var populateArchiveBlock = function (_a) {
    var doc = _a.doc, context = _a.context, req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var payload, adminOrPublishedResult, adminOrPublishedQuery, layoutWithArchive;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = req.payload;
                    return [4 /*yield*/, (0, adminsOrPublished_1.adminsOrPublished)({ req: req })];
                case 1:
                    adminOrPublishedResult = _b.sent();
                    adminOrPublishedQuery = adminOrPublishedResult;
                    return [4 /*yield*/, Promise.all(doc.layout.map(function (block) { return __awaiter(void 0, void 0, void 0, function () {
                            var archiveBlock_1, res;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(block.blockType === 'archive')) return [3 /*break*/, 2];
                                        archiveBlock_1 = block;
                                        if (!(archiveBlock_1.populateBy === 'collection' && !context.isPopulatingArchiveBlock)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, payload.find({
                                                collection: archiveBlock_1.relationTo,
                                                limit: archiveBlock_1.limit || 10,
                                                context: {
                                                    isPopulatingArchiveBlock: true,
                                                },
                                                where: __assign(__assign({}, (((_a = archiveBlock_1 === null || archiveBlock_1 === void 0 ? void 0 : archiveBlock_1.categories) === null || _a === void 0 ? void 0 : _a.length) > 0
                                                    ? {
                                                        categories: {
                                                            in: archiveBlock_1.categories
                                                                .map(function (cat) {
                                                                if (typeof cat === 'string' || typeof cat === 'number')
                                                                    return cat;
                                                                return cat.id;
                                                            })
                                                                .join(','),
                                                        },
                                                    }
                                                    : {})), (typeof adminOrPublishedQuery === 'boolean' ? {} : adminOrPublishedQuery)),
                                                sort: '-publishedAt',
                                            })];
                                    case 1:
                                        res = _b.sent();
                                        return [2 /*return*/, __assign(__assign({}, block), { populatedDocsTotal: res.totalDocs, populatedDocs: res.docs.map(function (thisDoc) { return ({
                                                    relationTo: archiveBlock_1.relationTo,
                                                    value: thisDoc.id,
                                                }); }) })];
                                    case 2: return [2 /*return*/, block];
                                }
                            });
                        }); }))];
                case 2:
                    layoutWithArchive = _b.sent();
                    return [2 /*return*/, __assign(__assign({}, doc), { layout: layoutWithArchive })];
            }
        });
    });
};
exports.populateArchiveBlock = populateArchiveBlock;
//# sourceMappingURL=populateArchiveBlock.js.map