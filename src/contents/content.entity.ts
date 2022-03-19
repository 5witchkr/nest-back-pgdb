import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ContentStatus } from "./content-status.enum";

@Entity()
export class Content extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: ContentStatus;

    @ManyToOne(type => User, user => user.contents, { eager: false })
    user: User;
}