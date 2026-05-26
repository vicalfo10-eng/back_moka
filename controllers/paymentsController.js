const { response } = require('express')
const db = require('../config/db')

const postPayments = async (req, res = response) => {

    const { installment_id, receivable_id, user_id, amount, payment_method, reference, payment_date } = req.body

    console.log('Datos recibidos para registrar pago:', installment_id, receivable_id, user_id, amount, payment_method, reference, payment_date)

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_pago_cuota(?, ?, ?, ?, ?, ?, ?)",
            [ 
                parseInt(installment_id),
                parseInt(receivable_id),
                parseInt(user_id),
                parseFloat(amount),
                payment_method,
                reference,
                payment_date
            ]
        )

        const result = rows[0][0]

        return res.status(result.status).json({
            ok: result.status === 201,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error registrando el pago:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    postPayments
}