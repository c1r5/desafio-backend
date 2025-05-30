
export const DI_TYPES = {
    DataSource: Symbol.for('DataSource'),
    MailerClient: Symbol.for('MailerClient'),
    Application: Symbol.for('Application'),

    UserRepository: Symbol.for('UserRepository'),
    UserUseCases: Symbol.for('UserUseCases'),

    CreateUserController: Symbol.for('CreateUserController'),
    UpdateUserController: Symbol.for('UpdateUserController'),

    TransactionUseCases: Symbol.for('TransactionUseCases'),
    TransactionRepository: Symbol.for('TransactionRepository'),
    TransactionController: Symbol.for('TransactionController'),

    SessionRepository: Symbol.for('SessionRepository'),
    SessionUseCase: Symbol.for('SessionUsecase'),

    LoginController: Symbol.for('LoginController'),
    LogoutController: Symbol.for('LogoutController'),

    VerifyJWTMiddleware: Symbol.for('JWTValidationMiddleware'),
    VerifySessionMiddleware: Symbol.for('SessionValidationMiddleware'),
    VerifyUserMiddleware: Symbol.for('UserValidationMiddleware'),
    VerifyUserTransferAbilityMiddleware: Symbol.for('VerifyUserTransferAbilityMiddleware')
};
