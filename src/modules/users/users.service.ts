import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getProfile(user: User) {
    const { passwordHash, emailToken, ...profile } = user;
    return profile;
  }

  async updateProfile(user: User, dto: UpdateProfileDto) {
    const onboardingComplete =
      user.onboardingComplete ||
      !!(
        (dto.jobTitle || user.jobTitle) &&
        (dto.workModel || user.workModel) &&
        (dto.company || user.company)
      );

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: { ...dto, onboardingComplete },
    });

    const { passwordHash, emailToken, ...profile } = updated;
    return profile;
  }
}
