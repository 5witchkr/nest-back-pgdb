import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
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
}