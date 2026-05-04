import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mail: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const emailToken = uuidv4();

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
        birthDate: new Date(dto.birthDate),
        emailToken,
      },
    });

    try {
      this.logger.log(`[MAIL] Enviando e-mail de confirmação para ${user.email}...`);
      await this.mail.sendConfirmationEmail(user.email, user.name, emailToken);
      this.logger.log(`[MAIL] E-mail enviado com sucesso para ${user.email}`);
    } catch (e) {
      this.logger.error(`[MAIL] Falha ao enviar e-mail para ${user.email}: ${e.message}`);
    }

    return { message: 'Cadastro realizado. Verifique seu e-mail para confirmar a conta.' };
  }

  async confirmEmail(token: string) {
    const user = await this.prisma.user.findFirst({ where: { emailToken: token } });
    if (!user) throw new NotFoundException('Token inválido ou expirado.');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailToken: null },
    });

    return { message: 'E-mail confirmado com sucesso.' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas.');

    if (!user.emailVerified) {
      throw new UnauthorizedException('Confirme seu e-mail antes de fazer login.');
    }

    return this.generateTokens(user.id, user.email);
  }

  async refresh(userId: number, email: string) {
    return this.generateTokens(userId, email);
  }

  private generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get('jwt.secret'),
      expiresIn: this.config.get('jwt.expiresIn'),
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('jwt.refreshSecret'),
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });

    return { accessToken, refreshToken };
  }

  async logout() {
    return { message: 'Logout realizado.' };
  }

  async resendConfirmation(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (user.emailVerified) throw new BadRequestException('E-mail já confirmado.');

    const emailToken = uuidv4();
    await this.prisma.user.update({ where: { id: user.id }, data: { emailToken } });
    try {
      this.logger.log(`[MAIL] Reenviando e-mail de confirmação para ${user.email}...`);
      await this.mail.sendConfirmationEmail(user.email, user.name, emailToken);
      this.logger.log(`[MAIL] E-mail reenviado com sucesso para ${user.email}`);
    } catch (e) {
      this.logger.error(`[MAIL] Falha ao reenviar e-mail para ${user.email}: ${e.message}`);
    }

    return { message: 'E-mail de confirmação reenviado.' };
  }
}
