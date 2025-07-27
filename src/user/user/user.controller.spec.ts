import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { title } from 'process';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  it('should can say hello', async () => {
    const result = await controller.sayHello('Rahasia');
    expect(result).toBe('Hello Rahasia');
  });

  it('should can view hello', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Rahasia', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({ name: 'Rahasia', title: 'Template Engine', });
  });
});
