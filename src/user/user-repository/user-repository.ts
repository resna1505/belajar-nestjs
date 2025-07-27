import { Connection } from "../connection/connection";

export class UserRepository {
    constructor(private connection: Connection) {}

    save() {
        console.info(`save user with connection ${this.connection.getName()}`);
    }
}


export function createUserRepository(connection: Connection): UserRepository {
    return new UserRepository(connection);
}
