import type { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(user: User): {
        name: string;
        id: number;
        email: string;
        birthDate: Date;
        emailVerified: boolean;
        jobTitle: string | null;
        workModel: import(".prisma/client").$Enums.WorkModel | null;
        company: string | null;
        onboardingComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    updateProfile(user: User, dto: UpdateProfileDto): Promise<{
        name: string;
        id: number;
        email: string;
        birthDate: Date;
        emailVerified: boolean;
        jobTitle: string | null;
        workModel: import(".prisma/client").$Enums.WorkModel | null;
        company: string | null;
        onboardingComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
