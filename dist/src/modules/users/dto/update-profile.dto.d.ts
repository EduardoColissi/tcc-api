import { WorkModel } from '@prisma/client';
export declare class UpdateProfileDto {
    name?: string;
    jobTitle?: string;
    workModel?: WorkModel;
    company?: string;
}
