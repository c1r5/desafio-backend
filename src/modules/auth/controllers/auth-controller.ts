import ControllerModel from "@/shared/domain/models/controller-model";
import {inject, injectable} from "inversify";
import AuthUsecase from "@/modules/auth/domain/usecases/auth-usecase";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import {
    LoginBody,
    LoginBodySchema,
    LoginResponse,
    LoginResponseSchema,
    LogoutResponse
} from "@/modules/auth/domain/schemas/login-schema";
import App from "@/app";
import {HasActiveSessionAuthError, LogoutAuthError, UserNotFoundAuthError} from "@/modules/auth/errors/auth-errors";

@injectable()
export default class AuthController implements ControllerModel {
    constructor(
        @inject(TYPES.AuthUsecase) private auth_usecase: AuthUsecase,
        @inject(TYPES.ApplicationServer) private app: App
    ) {
    }

    register_routes(app: FastifyInstance): void {
        app.register(server => {
            server.get<{ Reply: LogoutResponse }>('/logout', {}, async (request, reply) => {
                try {
                    await this.auth_usecase.logout(
                        app.jwt,
                        request.headers.authorization
                    )
                } catch (e) {
                    if (e instanceof LogoutAuthError) {
                        reply.status(400).send({message: e.message})
                    }

                    reply.status(500).send({message: 'Internal Server Error'})
                }
            });

            server.post<{ Body: LoginBody, Reply: LoginResponse }>('/login', {
                schema: {
                    body: LoginBodySchema,
                    response: {
                        200: LoginResponseSchema
                    },
                }
            }, async (request, reply) => {
                const login = request.body.document || request.body.email

                if (!login) return reply.status(400).send({message: 'invalid_credentials'})

                try {
                    let token = await this.auth_usecase.authenticate_user(app.jwt, login, request.body.password)
                    return reply.status(200).send({
                        message: 'success',
                        access_token: token
                    })
                } catch (e) {

                    if (e instanceof UserNotFoundAuthError) {
                        return reply.status(400).send({message: 'invalid credentials'})
                    } else if (e instanceof HasActiveSessionAuthError) {
                        return reply.status(403).send({message: 'has_active_session'})
                    }
                }
            })
        }, {prefix: '/api'})
    }
}