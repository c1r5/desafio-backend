# desafio-backend

_Serviços de pagamento simplificado_

## Regras de negocio

---

1. _documento e email unicos_.
2. _Lojistas só recebem transferências, não enviam dinheiro para ninguém_.
3. _Validar se o usuário tem saldo antes da transferência_.
4. _Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este
   mock https://util.devi.tools/api/v2/authorize para simular o serviço utilizando o verbo GET_.
5. _A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o
   dinheiro deve voltar para a carteira do usuário que envia_.
6. _No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um
   serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este
   mock https://util.devi.tools/api/v1/notify para simular o envio da notificação utilizando o verbo POST_.
7. _Este serviço deve ser RESTFul._

## Detalhes técnicos

- Linguagem principal: Node | Typescript
- Conteinerização: Docker
- Mensageria: Apache Kafka
- Cache: Redis
- Banco de dados: Postgresql
- Arquitetura: DDD
- Cobertura de testes atual: 0%

## Tasks

- [X] Arquitetura e Modelagem de Dados
    - [X] USUÁRIO
    - [x] TRANSFERENCIA
- [X] Banco de dados
    - [x] Inserção
    - [X] Deleção
    - [X] Atualização
- [ ] Features
    - [ ] Segurança
        - [X] Autenticação
            - [X] Login
                - [X] Implementar JWT (geração e validação de tokens)
                - [X] Testes: Login com credenciais válidas retorna token, credenciais inválidas retorna erro
        - [ ] Logout
        - [ ] Autorização
            - [ ] Definir permissões ( lojistas não podem realizar pagamentos )
            - [ ] Middleware para validação
            - [ ] Testes: Usuário sem permissão é bloqueado, usuário com permissão é autorizado
        - [ ] Refatorar ( pós testes )
            - [ ] Validar entradas com Zod
            - [ ] Implementar schemas de DTOs com Zod
    - [ ] Cadastro
        - [ ] Criar usuário básico (nome, email, senha)
        - [ ] Testes: Cadastro bem-sucedido retorna 201, email e documento duplicados retorna erro
    - [ ] Atualizar dados
    - [ ] Transferência
    - [ ] Notificação
        - [ ] Email
        - [ ] SMS

## Exemplo de Arquitetura

![](https://raw.githubusercontent.com/c1r5/desafio-backend/refs/heads/main/images/backend-challenge-arquitetura-inicial.png)

## Exemplo de Entity Relationship Diagram

![](https://github.com/c1r5/desafio-backend/blob/main/images/backend-challenge-ERD.png?raw=true)
