-- AlterTable
ALTER TABLE `attendance` MODIFY `status` ENUM('PRESENT', 'LATE', 'ABSENT', 'LEAVE') NOT NULL;
