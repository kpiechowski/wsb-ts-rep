/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "taskStatus" TEXT NOT NULL DEFAULT 'to do',
    "deadLineDate" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("complete", "deadLineDate", "description", "id", "title", "userId") SELECT "complete", "deadLineDate", "description", "id", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
