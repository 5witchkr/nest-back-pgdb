import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"
import { ContentStatus } from "./content.model";

export class Content extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: ContentStatus;
}