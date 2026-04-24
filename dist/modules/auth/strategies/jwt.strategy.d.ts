import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private config;
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        name: string;
        email: string;
        birthDate: Date;
        id: number;
        passwordHash: string;
        emailVerified: boolean;
        emailToken: string | null;
        jobTitle: string | null;
        workModel: import(".prisma/client").$Enums.WorkModel | null;
        company: string | null;
        onboardingComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
