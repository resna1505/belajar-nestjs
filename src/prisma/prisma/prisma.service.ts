import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.info(`Create Prisma Service`);
  }

  onModuleDestroy() {
    console.info('Disconnect Prisma');
    this.$disconnect();
  }

  onModuleInit() {
    console.info('Connect Prisma');
    this.$connect();
  }
}
