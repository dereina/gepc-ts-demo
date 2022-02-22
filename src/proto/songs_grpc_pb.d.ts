// package: songs
// file: songs.proto

import * as grpc from 'grpc';
import * as songs_pb from './songs_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

interface ISongsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getSong: IGetSong
  addSongs: IAddSongs
  getChat: IGetChat
  liveChat: ILiveChat
}

interface IGetSong {
  path: string; // "/songs.Songs/GetSong"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: google_protobuf_empty_pb.Empty;
  responseType: songs_pb.Song;
  requestSerialize: (arg: google_protobuf_empty_pb.Empty) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => google_protobuf_empty_pb.Empty;
  responseSerialize: (arg: songs_pb.Song) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => songs_pb.Song;
}

interface IAddSongs {
  path: string; // "/songs.Songs/AddSongs"
  requestStream: boolean; // true
  responseStream: boolean; // false
  requestType: songs_pb.Song;
  responseType: google_protobuf_empty_pb.Empty;
  requestSerialize: (arg: songs_pb.Song) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => songs_pb.Song;
  responseSerialize: (arg: google_protobuf_empty_pb.Empty) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => google_protobuf_empty_pb.Empty;
}

interface IGetChat {
  path: string; // "/songs.Songs/GetChat"
  requestStream: boolean; // false
  responseStream: boolean; // true
  requestType: songs_pb.Song;
  responseType: songs_pb.Comment;
  requestSerialize: (arg: songs_pb.Song) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => songs_pb.Song;
  responseSerialize: (arg: songs_pb.Comment) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => songs_pb.Comment;
}

interface ILiveChat {
  path: string; // "/songs.Songs/LiveChat"
  requestStream: boolean; // true
  responseStream: boolean; // true
  requestType: songs_pb.Comment;
  responseType: songs_pb.Comment;
  requestSerialize: (arg: songs_pb.Comment) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => songs_pb.Comment;
  responseSerialize: (arg: songs_pb.Comment) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => songs_pb.Comment;
}

export interface ISongsClient {
  getSong(request: google_protobuf_empty_pb.Empty, callback: (error: Error | null, response: songs_pb.Song) => void): grpc.ClientUnaryCall;
  getSong(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: Error | null, response: songs_pb.Song) => void): grpc.ClientUnaryCall;
  addSongs(callback: (error: Error | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<google_protobuf_empty_pb.Empty>;
  addSongs(metadata: grpc.Metadata, callback: (error: Error | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<google_protobuf_empty_pb.Empty>;
  getChat(request: songs_pb.Song, metadata?: grpc.Metadata): grpc.ClientReadableStream<songs_pb.Comment>;
  liveChat(metadata?: grpc.Metadata): grpc.ClientDuplexStream<songs_pb.Comment, songs_pb.Comment>;
}

export const SongsService: ISongsService;
export class SongsClient extends grpc.Client implements ISongsClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public getSong(request: google_protobuf_empty_pb.Empty, callback: (error: Error | null, response: songs_pb.Song) => void): grpc.ClientUnaryCall;
  public getSong(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: Error | null, response: songs_pb.Song) => void): grpc.ClientUnaryCall;
  public addSongs(callback: (error: Error | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<google_protobuf_empty_pb.Empty>;
  public addSongs(metadata: grpc.Metadata, callback: (error: Error | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<google_protobuf_empty_pb.Empty>;
  public getChat(request: songs_pb.Song, metadata?: grpc.Metadata): grpc.ClientReadableStream<songs_pb.Comment>;
  public liveChat(metadata?: grpc.Metadata): grpc.ClientDuplexStream<songs_pb.Comment, songs_pb.Comment>;
}

