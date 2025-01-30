const prisma = require("../prisma/prismaClient");

class MesaController {
    static async novaMesa(req, res) {
        const { codigo, n_lugares } = req.body;

        
        if (!codigo || codigo.length < 3) {
            return res.status(422).json({
                erro: true,
                mensagem: "O código da mesa deve ter pelo menos 3 caracteres.",
            });
        }

        if (!n_lugares || isNaN(n_lugares) || n_lugares <= 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "O número de lugares deve ser um número maior que zero.",
            });
        }

        
        const existeMesa = await prisma.mesa.count({
            where: {
                codigo: codigo,
            },
        });

        if (existeMesa !== 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "Já existe uma mesa cadastrada com este código.",
            });
        }

        try {
            const novaMesa = await prisma.mesa.create({
                data: {
                    codigo: codigo,
                    n_lugares: parseInt(n_lugares),
                },
            });

            return res.status(201).json({
                erro: false,
                mensagem: "Mesa cadastrada com sucesso!",
                mesa: novaMesa,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao cadastrar a mesa. Tente novamente mais tarde.",
                detalhe: error.message,
            });
        }
    }
    static async buscarMesas(req, res) {
        try {
            const mesas = await prisma.mesa.findMany();
            return res.status(200).json({
                erro: false,
                mensagem: "Mesas recuperadas com sucesso!",
                mesas,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar mesas. Tente novamente mais tarde.",
                detalhe: error.message,
            });
        }
    }
     static async mesasDisp(req, res) {
        const { data } = req.query;

        if (!data) {
            return res.status(422).json({
                erro: true,
                mensagem: "É necessário informar uma data no formato 'yyyy-mm-dd'.",
            });
        }

        try {
            const mesas = await prisma.mesa.findMany({
                include: {
                    reservas: {
                        where: {
                            data: new Date(data),
                        },
                    },
                },
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Consulta realizada com sucesso!",
                mesas,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao consultar a disponibilidade de mesas.",
                detalhe: error.message,
            });
        }
    }


}

module.exports = MesaController;