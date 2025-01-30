const prisma = require("../prisma/prismaClient");

class ReservaController {
    // Registrar reserva
    static async registrarReserva(req, res) {
        const { mesaId, n_pessoas, data } = req.body;

        if (!mesaId || !n_pessoas || !data) {
            return res.status(400).json({
                erro: true,
                mensagem: "Todos os campos são obrigatórios: mesaId, n_pessoas, data.",
            });
        }

        const reservaData = new Date(data);

        try {
            // Verificar se a data da reserva é hoje
            if (reservaData < new Date()) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A data da reserva não pode ser anterior à data atual.",
                });
            }

            // Verificar se a mesa existe e se a mesa consegue comportar o número de pessoas indicado
            const mesa = await prisma.mesa.findUnique({
                where: { id: parseInt(mesaId) },
                include: { reservas: { where: { data: reservaData, status: true } } },
            });

            if (!mesa) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "Mesa não encontrada. Verifique o ID fornecido.",
                });
            }

            // Verificar se a mesa consegue comportar o número de pessoas
            if (mesa.n_lugares < n_pessoas) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A mesa não tem lugares suficientes para o número de pessoas.",
                });
            }

            // Verificar se a mesa está livre para a data selecionada
            if (mesa.reservas && mesa.reservas.length > 0) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A mesa selecionada já está reservada para esta data.",
                });
            }

            // Criar a reserva
            await prisma.reserva.create({
                data: {
                    data: reservaData,
                    n_pessoas: n_pessoas,
                    usuario: {
                        connect: { id: req.usuarioId },
                    },
                    mesa: {
                        connect: { id: parseInt(mesaId) },
                    },
                },
            });

            return res.status(201).json({
                erro: false,
                mensagem: "Reserva realizada com sucesso.",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro ao cadastrar a reserva.",
                detalhe: err.message,
            });
        }
    }

    // Buscar minhas reservas
    static async minhasReservas(req, res) {
        try {
            const reservas = await prisma.reserva.findMany({
                where: {
                    usuarioId: req.usuarioId,
                },
                include: {
                    mesa: true,
                },
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Reservas encontradas com sucesso.",
                reservas,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar as reservas.",
                detalhe: err.message,
            });
        }
    }

    // Cancelar reserva
    static async cancelarReserva(req, res) {
        const { reservaId } = req.body;

        if (!reservaId) {
            return res.status(400).json({
                erro: true,
                mensagem: "O ID da reserva é obrigatório.",
            });
        }

        try {
            const reserva = await prisma.reserva.findUnique({
                where: { id: parseInt(reservaId) },
            });

            if (!reserva) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "Reserva não encontrada.",
                });
            }

            // Verifica se a reserva pertence ao usuário que está fazendo a requisição
            if (reserva.usuarioId !== req.usuarioId) {
                return res.status(403).json({
                    erro: true,
                    mensagem: "Você não tem permissão para cancelar esta reserva.",
                });
            }

            // Verifica se a data da reserva já passou
            if (new Date(reserva.data) < new Date()) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Você não pode cancelar reservas de datas passadas.",
                });
            }

            // Atualiza o status da reserva para "cancelada"
            await prisma.reserva.update({
                where: { id: parseInt(reservaId) },
                data: { status: false },
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Reserva cancelada com sucesso.",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao cancelar a reserva.",
                detalhe: err.message,
            });
        }
    }

    // Buscar todas as reservas por data
    static async buscarReservasPorData(req, res) {
        const { data } = req.query;

        if (!data) {
            return res.status(400).json({
                erro: true,
                mensagem: "É necessário informar uma data no formato 'yyyy-mm-dd'.",
            });
        }

        try {
            const reservas = await prisma.reserva.findMany({
                where: {
                    data: new Date(data),
                },
                include: {
                    mesa: true,
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                        },
                    },
                },
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Reservas encontradas com sucesso.",
                reservas,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar reservas.",
                detalhe: err.message,
            });
        }
    }

    // Buscar todas as reservas
    static async buscarReservas(req, res) {
        try {
            const reservas = await prisma.reserva.findMany();
            return res.status(200).json({
                erro: false,
                mensagem: "Reservas encontradas com sucesso.",
                reservas,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar reservas.",
                detalhe: err.message,
            });
        }
    }
}

module.exports = ReservaController;
