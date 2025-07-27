import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Inject, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { title } from 'process';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from 'generated/prisma';

@Controller('/api/users')
export class UserController {
    // @Get("/:id")
    // getById(@Req() request: Request): string {
    //     return `Get ${request.params.id}`
    // }
    // menggunakan express

    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository,
        @Inject('EmailService') private emailService: MailService,
        private memberService: MemberService,
    ) {}

    @Get('/connection')
    async getConnection(): Promise<string> {
        this.mailService.send();
        this.emailService.send();
        console.info(this.memberService.getConnectionName());
        this.memberService.sendEmail();
        return this.connection.getName();
    }

    @Get('/create')
    async create(
        @Query('first_name') firstName: string,
        @Query('last_name') lastName?: string,
    ): Promise<User> {
        return this.userRepository.save(firstName, lastName);
    }

    @Get('/hello')
    async sayHello(@Query('name') name: string): Promise<string> {
        return this.service.sayHello(name);
    }

    @Get('/view-hello')
    viewHello(@Query('name') name: string, @Res() response: Response){
        response.render('index.html', {
            title: 'Template Engine',
            name: name
        })
    }
    
    @Get('/sample-response')
    sampleResponse(@Res() response: Response){
        response.status(200).send('Sample Response');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request){
        return request.cookies['name'];
    }

    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Success Set Cookie');
    }

    @Get('/sample-json')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleJson(): Record<string, string> {
        return {
            message: 'Sample Json'
        }
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/sample-response',
            statusCode: 301,
        }
    }

    @Get('/:id')
    getById(@Param('id') id: string): string {
        return `Get ${id}`;
    }

    @Post()
    post(): string {
        return 'resba';
    }

    @Get('/sample')
    get(): string {
        return 'GET';
    }
}
