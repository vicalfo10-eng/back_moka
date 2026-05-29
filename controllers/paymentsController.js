const { response } = require('express')
const db = require('../config/db')

const postPayments = async (req, res = response) => {

    const { installment_id, receivable_id, user_id, amount, payment_method, reference, payment_date } = req.body

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
            status: result.status === 201,
            success: result.ok === 1,
            msg: result.msg,
            payment_data: {
                receipt_number: result.receipt_number,
                date: new Date(result.date).toLocaleString('es-CR'), // Formato local
                customer_name: result.customer_name,
                invoice_ref: result.invoice_ref,
                amount_paid: amount, // El monto enviado en el body
                new_balance: result.nuevo_saldo
    }
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