import {UserController} from "@/modules/users/interfaces/controllers/user-controller";
import App from "@/app";
import request from "supertest";
import {RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import UserEntity from "@/modules/users/domain/entities/user-entity";

describe('user controller', () => {

    let datasource: DataSource
    let server: RawServerDefault

    beforeAll(async () => {
        datasource = await AppDataSource.initialize()

        let app = new App()
        let user_controller = container.get<UserController>(TYPES.UserController)

        app.register_api_controller(user_controller)

        server = await app.mock_on_ready()
    });

    afterAll(async () => {
        await datasource.destroy()
    });

    it('should create user', async () => {
        let new_user: Partial<UserEntity> = {
            name: fakerPT_BR.person.fullName(),
            email: fakerPT_BR.internet.email(),
            phone: fakerPT_BR.phone.number(),
            type: 'pf',
            document: generate_cpf(),
            password: fakerPT_BR.internet.password()
        };

        let create_user = await request(server)
            .post('/api/user/create')
            .send(new_user)

        expect(create_user.status).toBe(201)
    });

    it('should authenticate user', async () => {
        let auth_user = await request(server)
            .post('/api/user/authenticate')
            .send({
                email: 'Matheus.Oliveira83@bol.com.br',
                password: 'EkNr0nC7oc5euG_'
            })

        expect(auth_user.status).toBe(200)
        expect(auth_user.body.user_id).toBeTruthy()
    });

    it('should update user phone', async () => {
        let result = await request(server)
            .put('/api/user/update')
            .send({
                userId: '766fa2a4-a11a-44b1-8aec-1d0d93eddd4a',
                phone: '11999999999'
            })
        expect(result.status).toBe(200)
        expect(result.body.phone).toBe('11999999999')
    });
})