import * as grpc from 'grpc'
//import {Empty} from 'google-protobuf'
import { SongsService } from './proto/songs_grpc_pb'
import { Song, Comment } from './proto/songs_pb'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import { Song as SongEntity } from './entity.song'
import {Comment as CommentEntity} from './entity.comment'
import { getRepository } from "typeorm";

const getSong: grpc.handleUnaryCall<Empty, Song> =
async(call: grpc.ServerUnaryCall<Empty>, cb : grpc.sendUnaryData<Song>) => {
    console.log("server getSong")
    let songs = await getRepository(SongEntity).find({relations: ["comments"]});
    //console.log(songs);
    let song = new Song();
    song.setTitle(songs[0].title);
    song.setArtist(songs[0].artist);
    return cb(null, song);

};

const addSongs: grpc.handleClientStreamingCall<Song, Empty> =
async(call :grpc.ServerReadableStream<Song>, cb :grpc.sendUnaryData<Empty>) => {
    console.log("server addSongs");
    call.on('data', (song: Song) => {
        console.log("server addSongs receiving: "+song.getTitle());
        let sentity = new SongEntity();
        sentity.title = song.getTitle();
        sentity.artist = song.getArtist();
        getRepository(SongEntity).save({...sentity});
    
    });
    call.on('end', () => cb(null, new Empty()));
};

const getChat:grpc.handleServerStreamingCall<Song, Comment> =
async(call:grpc.ServerWritableStream<Song, Comment>) => {
    console.log("server getChat");
    console.log(call.request.getTitle());
    let comments = await getRepository(CommentEntity).find({
        where:[
            {"songId":call.request.getId()}
        ]
    });
    for(let i=0; i<comments.length; i++){    
        let comment = new Comment();
        console.log(i+" comment", comments[i])
        comment.setBody(comments[i].body)
        comment.setSongId(comments[i].songId)
        comment.setUsername(comments[i].username)
        call.write(comment);
        
    }
    call.end();

};

const liveChat:grpc.handleBidiStreamingCall<Comment, Comment> =
async(call:grpc.ServerDuplexStream<Comment, Comment>) => {
    console.log("server liveChat")
    call.on('data',(comment:Comment) => {
        console.log("server live Chat receiving", comment.getSongId());
        let centity = new CommentEntity();
        centity.songId = comment.getSongId();
        centity.body = comment.getBody();
        centity.username = comment.getUsername();
        getRepository(CommentEntity).save({...centity});
        call.write(comment);
        
    }); 
    call.on('end', () => call.end());
    
};

export default [
    {
        service: SongsService,
        impl: {
            getSong:getSong,
            addSongs:addSongs,
            getChat:getChat,
            liveChat:liveChat
        }
    }
];