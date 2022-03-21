import { Content } from "src/contents/content.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserAurhority } from "./user-authority.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Content, content => content.user, {eager: true})
    contents: Content[]

    //eager? entity를 조회할때 join된 데이터까지 가져오는 옵션
    @OneToMany(type=>UserAurhority, userAurhority => userAurhority.user, {eager:true})
    authorities?: any[];
}