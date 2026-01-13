/*
  Warnings:

  - A unique constraint covering the columns `[cpf,usuarioId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,usuarioId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_usuarioId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_usuarioId_key" ON "Cliente"("cpf", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_usuarioId_key" ON "Cliente"("email", "usuarioId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
