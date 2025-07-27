import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    send(){
        console.info('send mail');
    }
}

export const mailService = new MailService();