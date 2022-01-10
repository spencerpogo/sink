import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.js";

@Entity()
@ObjectType()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @Column()
  @Field()
  name: string;

  @Column({ type: "datetime" })
  @Field()
  start: Date;
}
