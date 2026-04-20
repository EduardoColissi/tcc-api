/*
  Warnings:

  - You are about to drop the column `duration_minutes` on the `pomodoro_sessions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FocusEventType" AS ENUM ('PERSON_ABSENT', 'CELL_PHONE', 'MULTIPLE_PEOPLE', 'HEAD_TURNED', 'LOOKING_DOWN', 'EYES_CLOSED');

-- AlterTable
ALTER TABLE "pomodoro_sessions" DROP COLUMN "duration_minutes",
ADD COLUMN     "monitoring_enabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "focus_events" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "type" "FocusEventType" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "duration_ms" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "focus_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "focus_events_session_id_idx" ON "focus_events"("session_id");

-- CreateIndex
CREATE INDEX "focus_events_session_id_type_idx" ON "focus_events"("session_id", "type");

-- AddForeignKey
ALTER TABLE "focus_events" ADD CONSTRAINT "focus_events_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "pomodoro_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
