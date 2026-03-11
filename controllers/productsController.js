const { response } = require('express')
const db = require('../config/db')

const getProductRegister = async (req, res = response) => {

    const { codigo } = req.query

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_obtener_producto(?)",
            [ codigo ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error obteniendo el producto:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const getProductStatus = async (req, res = response) => {
    
    //const { correo, contrasena } = req.body

    try {
        const [product] = await db.query(
            "SELECT * FROM productos WHERE activo = 1"
        )

        if (product.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Producto no existe o esta inactivo." 
            })

        res.status(200).json({
            status: 200,
            msg: "Producto obtenido correctamente",
            product
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

const postProductRegister = async (req, res = response) => {

    const { id_categoria, id_proveedor, codigo, nombre, precio, stock, stock_minimo, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_producto(?, ?, ?, ?, ?, ?, ?, ?)",
            [ 
                parseInt(id_categoria),
                parseInt(id_proveedor),
                codigo,
                nombre,
                parseFloat(precio),
                parseInt(stock),
                parseInt(stock_minimo),
                activo
            ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        console.log(rows)

        return res.status(result.status).json({
            ok: result.status === 201,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error registrando el producto:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const putProductRegister = async (req, res = response) => {

    const { id_categoria, id_proveedor, codigo, nombre, precio, stock, stock_minimo, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_actualizar_producto(?, ?, ?, ?, ?, ?, ?, ?)",
            [ 
                parseInt(id_categoria),
                parseInt(id_proveedor),
                codigo,
                nombre,
                parseFloat(precio),
                parseInt(stock),
                parseInt(stock_minimo),
                activo
            ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error actualizando el producto:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const deleteProductRegister = async (req, res = response) => {

    const { codigo } = req.query;

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_eliminar_producto(?)",
            [ codigo ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        console.log(rows)

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error eliminando el producto:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getProductRegister,
    getProductStatus,
    postProductRegister,
    putProductRegister,
    deleteProductRegister
}
