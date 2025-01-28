const prisma = require("../prisma/prismaClient");
const router = require("../routes/ProfileRoutes");
const MesaController = require("./MesaController");
const prismaClient = new prisma();

class ReservaController{
  static async registrarReserva (req, res) {
   const { mesaId, n_pessoas } = req.body;
   const data = new Date(req.body.data);

   const mesa = await prisma.mesa.findUnique({
    where: {id: mesaId},
    include:{
      reservas: {
        where:{
          data: data,
          status: true,
        },
      },
    },
   });

   if(mesa.reserva.length > 0) {
    return res.status(400).json({
      erro: true,
      mensagem: "A mesa selecionada já reservada para está data."
    });
   }

   prisma.reserva.create({
    data: {
      data: data,
      n_pessoas: n_pessoas,
      usuario: {
        connect: {
          id: req.usuarioId
        },
      },
      mesa: {
        connect: {
          id: mesaId
        },
      },
    },
   }).then(() => {
    return res.status(201).json({
      erro: false,
      mensagem: "Reserva realizada com sucesso"
    });
   })
   .catch((err) => {
    return res.status(201).json({
      erro: true,
      mensagem: "Ocorreu um erro ao cadastrar reserva."
    });
   });
}
}
module.exports = ReservaController;