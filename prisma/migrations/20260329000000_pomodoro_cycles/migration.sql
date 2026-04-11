-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('FOCUS', 'BREAK');

-- AlterTable
ALTER TABLE "pomodoro_sessions"
ADD COLUMN "type" "SessionType" NOT NULL DEFAULT 'FOCUS',
ADD COLUMN "cycle_number" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "duration_seconds" INTEGER;
