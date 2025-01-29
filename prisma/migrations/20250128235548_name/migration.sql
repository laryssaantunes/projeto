/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `id` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Mesa_codigo_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "n_pessoas" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" INTEGER NOT NULL,
    "mesaId" INTEGER NOT NULL,
    CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reserva" ("data", "id", "mesaId", "n_pessoas", "usuarioId") SELECT "data", "id", "mesaId", "n_pessoas", "usuarioId" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "nome", "password", "tipo") SELECT "email", "nome", "password", "tipo" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
