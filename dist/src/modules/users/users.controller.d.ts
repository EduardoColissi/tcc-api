import type { User } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    getMe(user: User): {
        name: string;
        email: string;
        birthDate: Date;
        id: number;
        emailVerified: boolean;
        jobTitle: string | null;
        workModel: import(".prisma/client").$Enums.WorkModel | null;
        company: string | null;
        onboardingComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    updateMe(user: User, dto: UpdateProfileDto): Promise<{
        name: string;
        email: string;
        birthDate: Date;
        id: number;
        emailVerified: boolean;
        jobTitle: string | null;
        workModel: import(".prisma/client").$Enums.WorkModel | null;
        company: string | null;
        onboardingComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
