import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export default class UserModel extends BaseEntity {
    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    user_id!: string;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ unique: true, type: 'varchar', length: 100 })
    email!: string;

    @Column({ unique: true, type: 'varchar', length: 15 })
    phone!: string;

    @Column({ unique: true, type: 'varchar', length: 15 })
    document!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    @Column({ type: 'varchar', length: 10 })
    user_type!: string;

    @Column({ type: 'varchar', length: 100, default: "inactive" })
    status!: "active" | "inactive" | "blocked";

    @Column({ type: 'bigint', default: 0n })
    balance!: bigint

    @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: number;

    @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: number;
}
