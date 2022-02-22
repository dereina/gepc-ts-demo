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
//import {Empty} from 'google-protobuf'
const songs_grpc_pb_1 = require("./proto/songs_grpc_pb");
const getSong = (call, cb) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getSong");
    return cb(null, null);
});
const addSongs = (call, cb) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addSongs");
});
const getChat = (call) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getChat");
});
const liveChat = (call) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("liveChat");
});
exports.default = [
    {
        service: songs_grpc_pb_1.SongsService,
        impl: {
            getSong: getSong,
            addSongs: addSongs,
            getChat: getChat,
            liveChat: liveChat
        }
    }
];
//# sourceMappingURL=controller.song.js.map