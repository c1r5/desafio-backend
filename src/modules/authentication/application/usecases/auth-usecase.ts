import {JWT} from "@fastify/jwt";
import {AuthSessionEntity} from "@/modules/authentication/domain/entities/auth-session-entity";

export default interface AuthUsecase {
    authenticate_user(
        jwt: JWT,
        login: string,
        password: string
    ): Promise<string>

    has_session(user_id: string): Promise<AuthSessionEntity | null>

    logout(
        jwt: JWT,
        authorization: string | undefined): Promise<void>;
}