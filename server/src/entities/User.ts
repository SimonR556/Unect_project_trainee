import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar', { unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}