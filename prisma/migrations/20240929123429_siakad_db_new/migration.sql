/*
  Warnings:

  - Added the required column `semester` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sks` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `semester` ENUM('semester_1', 'semester_2', 'semester_3', 'semester_4', 'semester_5', 'semester_6', 'semester_7', 'semester_8') NOT NULL,
    ADD COLUMN `sks` INTEGER NOT NULL;
