import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('appConfig.mailHost'),
          secure: false,
          port: 2525,
          auth: {
            user: configService.get('appConfig.smtpUsername'),
            pass: configService.get('appConfig.smtpPassword'),
          },
          default: {
            from: 'My Blog <no-reply@nestjs-blog.com>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter(),
            options: { strict: false },
          },
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {}