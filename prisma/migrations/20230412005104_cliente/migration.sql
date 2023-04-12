-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" VARCHAR(50) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
