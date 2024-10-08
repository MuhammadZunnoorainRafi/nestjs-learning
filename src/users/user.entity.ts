import { Exclude } from 'class-transformer';
import { Posts } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  @Exclude()
  password?: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Posts, (posts) => posts.author)
  posts: Posts[];
}
