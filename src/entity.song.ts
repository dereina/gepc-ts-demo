import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from "typeorm";
  import { Comment } from "./entity.comment";
  
  @Entity()
  export class Song {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
        type: "text",
    })
    title!: string;
    
    @Column({
        type: "text",
    })
    artist!: string;
  
    @OneToMany((_type) => Comment, (comment: Comment) => comment.song)
    comments!: Array<Comment>;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }