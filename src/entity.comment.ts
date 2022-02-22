import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from "typeorm";
  import { Song } from "./entity.song";
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
        type: "text",
    })
    username!: string;
    
    @Column({
        type: "text",
    })
    body!: string;
      
  
    @Column({ nullable: true })
    songId!: number;
    @ManyToOne((_type) => Song, (song: Song) => song.comments)
    @JoinColumn()
    song!: Song;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }