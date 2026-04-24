"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const prisma_service_1 = require("../../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    mail;
    constructor(prisma, jwt, config, mail) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.mail = mail;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new common_1.ConflictException('E-mail já cadastrado.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const emailToken = (0, uuid_1.v4)();
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
            await this.mail.sendConfirmationEmail(user.email, user.name, emailToken);
        }
        catch (e) {
            console.error('Falha ao enviar e-mail de confirmação:', e.message);
        }
        return { message: 'Cadastro realizado. Verifique seu e-mail para confirmar a conta.' };
    }
    async confirmEmail(token) {
        const user = await this.prisma.user.findFirst({ where: { emailToken: token } });
        if (!user)
            throw new common_1.NotFoundException('Token inválido ou expirado.');
        await this.prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: true, emailToken: null },
        });
        return { message: 'E-mail confirmado com sucesso.' };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        if (!user.emailVerified) {
            throw new common_1.UnauthorizedException('Confirme seu e-mail antes de fazer login.');
        }
        return this.generateTokens(user.id, user.email);
    }
    async refresh(userId, email) {
        return this.generateTokens(userId, email);
    }
    generateTokens(userId, email) {
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
    async resendConfirmation(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        if (user.emailVerified)
            throw new common_1.BadRequestException('E-mail já confirmado.');
        const emailToken = (0, uuid_1.v4)();
        await this.prisma.user.update({ where: { id: user.id }, data: { emailToken } });
        try {
            await this.mail.sendConfirmationEmail(user.email, user.name, emailToken);
        }
        catch (e) {
            console.error('Falha ao reenviar e-mail:', e.message);
        }
        return { message: 'E-mail de confirmação reenviado.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map