const express = require("express");
const appRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();





//all

appRoutes.get("/all", async (req, res) => {

  try {
    const allCliente = await prisma.cliente.findMany();

    return res.status(200).json(allCliente);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error listing client." });
  }
});

// Rota para buscar um usuário pelo ID

appRoutes.get("/client/:id", async (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  try {
    const client = await prisma.cliente.findUnique({ where: { id: intId } });
    if (!client) {
      return res.status(404).json({ message: "client not exist" });
    }
    res.json(client);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error listing client" });
  }
});

//create

appRoutes.post("/create", async (req, res) => {
  const { nomeCompleto, email, dataNascimento, cpf } = req.body

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nomeCompleto,
        email,
        dataNascimento,
        cpf
      },
    });
    return res.status(201).json(cliente);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating client." });
  }
});

//Update

appRoutes.put("/update", async (req, res) => {
  const { id, nomeCompleto, dataNascimento, email, cpf } = req.body;

  try {
  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const clienteAlreadyExist = await prisma.cliente.findUnique({ where: { id } });

  if (!clienteAlreadyExist) {
    return res.status(404).json("client not exist");
  }

  const cliente = await prisma.cliente.update({
    where: {
      id,
    },
    data: {
        nomeCompleto,
        email,
        dataNascimento,
        cpf,
    },
  });

  return res.status(200).json(cliente);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Error updating client" });
}
});

//delete

appRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  try {

    if (!intId) {
      return res.status(400).json("Id is mandatory");
    }
  
    const clienteAlreadyExist = await prisma.cliente.findUnique({
      where: { id: intId },
    });
  
    if (!clienteAlreadyExist) {
      return res.status(404).json("client not exist");
    }
  
    await prisma.cliente.delete({ where: { id: intId } });
  
    return res.status(200).send();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting client." });
  }
});



module.exports = appRoutes;