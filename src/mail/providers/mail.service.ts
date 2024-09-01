import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  public async sendUserWelcomeEmail(users: Users) {
    return await this.mailerService.sendMail({
      to: users.email,
      // override default from
      from: '"Onbaording Team" <support@nestjs-blog.com>',
      subject: 'Welcome to NestJs Blog',
      // `.ejs` extension is appended automatically to template
      template: './welcome',
      // Context is available in email template
      context: {
        name: users.firstName,
        email: users.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
