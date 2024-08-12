import { Posts } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: false })
  metaValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Posts, (posts) => posts.metaOptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  posts: Posts;
}
