import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('mail.host'),
      port: this.config.get<number>('mail.port'),
      secure: false,
      auth: {
        user: this.config.get('mail.user'),
        pass: this.config.get('mail.pass'),
      },
    });
  }

  async sendConfirmationEmail(to: string, name: string, token: string) {
    const frontendUrl = this.config.get('frontendUrl');
    const url = `${frontendUrl}/confirm-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"TCC App" <eduardocolissiprofissional@gmail.com>`,
      to,
      subject: 'Confirme seu e-mail',
      html: `
        <h2>Olá, ${name}!</h2>
        <p>Clique no link abaixo para confirmar seu e-mail:</p>
        <a href="${url}">${url}</a>
        <p>O link expira em 24 horas.</p>
      `,
    });

    this.logger.log(`Email de confirmação enviado para ${to}`);
  }
}
