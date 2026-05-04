import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private resend: Resend;

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get('mail.resendApiKey'));
  }

  async sendConfirmationEmail(to: string, name: string, token: string) {
    const frontendUrl = this.config.get('frontendUrl');
    const url = `${frontendUrl}/confirm-email?token=${token}`;
    const from = this.config.get<string>('mail.from')!;

    const { error } = await this.resend.emails.send({
      from,
      to,
      subject: 'Confirme seu e-mail',
      html: `
        <h2>Olá, ${name}!</h2>
        <p>Clique no link abaixo para confirmar seu e-mail:</p>
        <a href="${url}">${url}</a>
        <p>O link expira em 24 horas.</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    this.logger.log(`Email de confirmação enviado para ${to}`);
  }
}
