import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailApproved(email: string, username: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '【Zenシステム】会員登録が完了いたしました。',
      template: './welcome',
      context: {
        name: username,
      },
    });
  }

  async sendMailWarning(email: string, username: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Warning',
      template: './warning',
      context: {
        name: username,
      },
    });
  }

  async sendMailForgotPassword(email: string, username: string, token: string) {
    const forgot_password_url = `http://54.95.189.16:3000/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'パスワードリマインダー',
      template: './reset-password',
      context: {
        name: username,
        forgot_password_url,
      },
    });
  }
}
