import * as grpc from 'grpc'
import songs from './controller.song'
import { SongsClient } from './proto/songs_grpc_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Song, Comment } from './proto/songs_pb';
import config from './config.database'
import { createConnection } from 'typeorm';
import { strictEqual } from 'assert';

createConnection(config)
    .then((_connection) => {
        const port = 15001;
        const server = new grpc.Server();
        server.addService(songs[0].service, songs[0].impl)
        server.bind(`localhost:${port}`, grpc.ServerCredentials.createInsecure());
        server.start();
        console.log(`GRPC Server listening on port ${port}`);

        //Client
        const client = new SongsClient(
            `localhost:${port}`,
            grpc.credentials.createInsecure(),
        );

        //getSong
        client.getSong(new Empty(), (err, song) => {
            if (err) {
                console.log("ERROR")
                //return reject(err);
            }
            console.log("client getSong " + song.getTitle() + " " + song.getArtist())
            console.log(song);

        });
        
        //addSongs
        const addsong_stream = client.addSongs(
            (err, res: Empty) => {
                if (err) {
                    throw err;
                }
        });
        for(let i=1; i<= 10; i++){
            let song = new Song();
            song.setTitle("House Fire");
            console.log(i)
            song.setArtist("The Wayler " + i);
            addsong_stream.write(song);
        
        }

        //getChat
        let song = new Song();
        song.setId(14);
        const getchat_stream = client.getChat(song);
        getchat_stream.on('data', (comment: Comment) => {
            console.log('client getChat receiving')
            console.log(`(${comment.getUsername()}) and the body ${comment.getBody()}`);

        });

        //liveChat
        const live_chat_stream = client.liveChat()
        live_chat_stream.on('data', (comment: Comment) => {
            console.log("client live chat receiving");
            console.log(comment.getBody(), comment.getSongId());

        });
        let i:number = 10;
        while(i) {
            const comment = new Comment();
            comment.setUsername("oriol")
            comment.setBody(i +" content body " + i);
            comment.setSongId(i);
            i--;
            live_chat_stream.write(comment);

        }
    });



