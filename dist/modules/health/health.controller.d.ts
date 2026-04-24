import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    ready(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
}
