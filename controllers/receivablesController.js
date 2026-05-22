const { response } = require('express')
const db = require('../config/db')

const getReceivables = async (req, res) => {

    const idCliente = parseInt(req.query.id_cliente) || 0
    const idVenta = parseInt(req.query.id_venta) || 0

    try {

        const [rows] = await db.query(
            "CALL sp_obtener_cxc(?, ?)",
            [idCliente, idVenta]
        )
        
        const accounts = rows[0]

        if (accounts[0].ok === 1) {

            return res.status(200).json({
                status: 200,
                ok: 1,
                accounts
            })
        } else {

            return res.status(400).json({
                status: 400,
                ok: 0,
                msg: "No se encontraron cuentas por cobrar para el cliente y venta especificados."
            })
        }

    } catch (error) {

        console.error("Error en las cuentas por cobrar:", error)
        return res.status(500).json({
            ok: false,
            msg: "Error de servidor al obtener las cuentas por cobrar"
        })
    }
}

const getInstallments = async (req, res) => {

    const idCxc = parseInt(req.query.id_cxc) || 0

    try {

        const [rows] = await db.query(
            "CALL sp_obtener_plan_pagos(?)",
            [idCxc]
        )
        
        const quotas = rows[0]

        if (quotas[0].ok === 1) {

            return res.status(200).json({
                status: 200,
                ok: 1,
                quotas
            })
        } else {

            return res.status(400).json({
                status: 400,
                ok: 0,
                msg: "No se encontraron cuotas para la cuenta por cobrar especificada."
            })
        }

    } catch (error) {

        console.error("Error en las cuotas para la cuenta por cobrar:", error)
        return res.status(500).json({
            ok: false,
            msg: "Error de servidor al obtener las cuotas"
        })
    }
}

module.exports = {
    getReceivables,
    getInstallments
}