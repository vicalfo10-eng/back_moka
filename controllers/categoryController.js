const { response } = require('express')
const db = require('../config/db')

const getCategoryRegister = async (req, res = response) => {

    const { id_categoria } = req.query

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_obtener_categoria(?)",
            [ id_categoria ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error obteniendo la categoría:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const getCategoryStatus = async (req, res = response) => {
    
    try {
        const [category] = await db.query(
            "SELECT * FROM categorias WHERE activo = 1"
        )

        if (category.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Categorías no existe o esta inactivo." 
            })

        res.status(200).json({
            status: 200,
            msg: "Categorías obtenidas correctamente",
            category
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

const postCategoryRegister = async (req, res = response) => {

    const { nombre, descripcion, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_categoria(?, ?, ?)",
            [ nombre, descripcion, activo ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 201,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error registrando la categoría:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const putCategoryRegister = async (req, res = response) => {

    const { id_categoria, nombre, descripcion, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_actualizar_categoria(?, ?, ?, ?)",
            [ id_categoria, nombre, descripcion, activo ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error actualizando la categoría:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const deleteCategoryRegister = async (req, res = response) => {

    const { id_categoria } = req.query;

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_eliminar_categoria(?)",
            [ id_categoria ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error eliminando la categoría:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getCategoryRegister,
    getCategoryStatus,
    postCategoryRegister,
    putCategoryRegister,
    deleteCategoryRegister
}