"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("grpc"));
const controller_song_1 = __importDefault(require("./controller.song"));
const songs_grpc_pb_1 = require("./proto/songs_grpc_pb");
const empty_pb_1 = require("google-protobuf/google/protobuf/empty_pb");
const port = 15001;
const server = new grpc.Server();
server.addService(controller_song_1.default[0].service, controller_song_1.default[0].impl);
server.bind(`localhost:${port}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`GRPC Server listening on port ${port}`);
const client = new songs_grpc_pb_1.SongsClient(`localhost:${port}`, grpc.credentials.createInsecure());
client.getSong(new empty_pb_1.Empty(), (err, song) => {
    if (err) {
        console.log("ERROR");
        //return reject(err);
    }
    return console.log(song);
});
//# sourceMappingURL=index.js.map