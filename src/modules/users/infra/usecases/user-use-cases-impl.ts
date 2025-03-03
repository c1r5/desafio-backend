import {inject, injectable} from "inversify";
import UserRepository from "../../domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity, {UserID} from "@/modules/users/domain/entities/user-entity";

@injectable()
export default class UserUseCasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepositoryMock) user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async authenticate(user: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.user_repository.orm_repo.findOneBy([
            {email: user.email, password: user.password},
            {document: user.document, password: user.password}
        ])
    }

    async authorize(token: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm_repo.findOneBy({userId: id})
    }

    async create_user(user: Partial<UserEntity>): Promise<UserID> {
        let result = await this.user_repository.orm_repo.save(user);
        return result.userId;
    }
}