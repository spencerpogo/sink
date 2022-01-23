import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { dateToTimestamp, timestampToDate } from "../dates.js";
import { User } from "./User.js";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @Column()
  name: string;

  @Column({ type: "numeric" })
  start: number;
}

@ObjectType()
export class EventType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  start: Date;
}

export function toEventType(e: Event): EventType {
  return { ...e, start: timestampToDate(e.start) };
}

export function fromEventType(e: EventType): Event {
  return Event.create({ ...e, start: dateToTimestamp(e.start) });
}
