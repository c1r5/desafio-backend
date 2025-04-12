import { inject, injectable } from "inversify";
import UserRepository from "@/shared/modules/user/user-repository";
import { TYPES } from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/modules/user/user-usecases";
import { UserEntity } from "../../domain/entities/user-entity";
import { get_env } from "@/shared/application/helpers/get-env";
import { generate_verification_token } from "@/shared/application/helpers/verification-token";
import { UserNotFound } from "@/shared/application/errors/operation-error";
import { generate_email_verify_template } from "@/shared/modules/user/generate-email-verify-template";
import { CreateUserOptions } from "@/shared/modules/user/create-user-options";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
    ) {
    }

    async create_user(data: CreateUserOptions): Promise<void> {
        await this.user_repository.create_user({
            email: data.email.value,
            password: data.password.value,
            name: data.name,
            document: data.document.value,
            phone: data.phone.value,
            user_type: data.document.type
        })
    }

    async request_email_verification(user_id: string): Promise<void> {
        try {
            const user = await this.user_repository.get_user_by_id(user_id);

            if (!user) {
                throw new UserNotFound();
            }

            const token = generate_verification_token(user.user_id);
            const verification_link = `${get_env("APP_URL")}/verify-email?token=${token}`;
            const email_template = generate_email_verify_template(verification_link)

            console.log("[EMAIL VERIFICATION] Sending email verification to:", user.email);

        } catch (error) {
            console.error("Error requesting email verification:", error);
            throw new Error("Error requesting email verification");
        }
    }

    async get_user_email(user_id: string): Promise<string> {
        const user = await this.user_repository.get_user_by_id(user_id);

        if (!user) {
            throw new Error("User not found");
        }

        return user.email;
    }

    async update_user(user_id: string, value: Partial<UserEntity>): Promise<void> {
        const update = await this.user_repository.update_user(user_id, {
            name: value.name,
            email: value.email?.value,
            phone: value?.phone?.value,
            document: value.document?.value,
            password: value.password?.value
        });

        if (!update) {
            throw new UserNotFound();
        }

        // if (update && value.email) {
        //     await this.request_email_verification(user_id)
        // }
    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({ user_id: user_id })
        return user_entity?.status === 'active'
    }
}