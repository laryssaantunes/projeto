const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

const reservarMesa = async (req, res) => {
  const { data, n_pessoas, mesaId } = req.body;
  const usuarioId = req.usuario.id;

  const mesa = await prismaClient.mesa.findUnique({ where: { id: mesaId } });
  if (!mesa) {
    return res.status(404).json({ mensagem: 'Mesa não encontrada', erro: true });
  }

  const reserva = await prismaClient.reserva.create({
    data: {
      data: new Date(data),
      n_pessoas,
      mesaId,
      usuarioId,
    },
  });

  return res.json({ mensagem: 'Mesa reservada com sucesso', erro: false });
};

const listarReservas = async (req, res) => {
  const usuarioId = req.usuario.id;
  const reservas = await prismaClient.reserva.findMany({
    where: { usuarioId },
    include: { mesa: true },
  });

  return res.json({ reservas });
};

module.exports = { reservarMesa, listarReservas };
