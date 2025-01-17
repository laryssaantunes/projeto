const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

const cadastrarMesa = async (req, res) => {
  const { codigo, n_lugares } = req.body;

  const mesaExistente = await prismaClient.mesa.findUnique({ where: { codigo } });

  if (mesaExistente) {
    return res.status(400).json({ mensagem: 'Mesa já existe', erro: true });
  }

  const novaMesa = await prismaClient.mesa.create({
    data: {
      codigo,
      n_lugares,
    },
  });

  return res.json({ mensagem: 'Mesa cadastrada com sucesso', erro: false });
};

const listarMesas = async (req, res) => {
  const mesas = await prismaClient.mesa.findMany();
  return res.json({ mesas });
};

module.exports = { cadastrarMesa, listarMesas };
