import { Inject, Injectable } from "@nestjs/common";
import { Connection } from "../connection/connection";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { User } from "generated/prisma";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class UserRepository {
    constructor(
        private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,){
        console.info(`Create User Repository`);
    }

    save(firstName: string, lastName?: string): Promise<User>{
        this.logger.info(`create user with firstName ${firstName} and lastName ${lastName}`);
        return this.prismaService.user.create({
            data: {
                first_name: firstName, 
                last_name: lastName,
            }
        });
    }
}
