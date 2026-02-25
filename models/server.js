const express = require('express')
const cors = require('cors')

const db = require('../config/db')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            customers:      `${process.env.PATH_URL}/${process.env.STAGE}`,
            login:          `${process.env.PATH_URL}/${process.env.STAGE}`,
            userRegister:   `${process.env.PATH_URL}/${process.env.STAGE}`,
            roles:          `${process.env.PATH_URL}/${process.env.STAGE}`
        }

        this.dbConnection()
        this.middlewares()
        this.routes()

    }

    async dbConnection() {
        try {

            await db.query('SELECT 1');
            console.log('Database online');

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    middlewares() {

        //CORS
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static( 'public' ) )
    }

    routes() {
        this.app.use( this.paths.customers, require( '../routes/customersRoutes' ) )
        this.app.use( this.paths.login, require( '../routes/loginRoutes' ) )
        this.app.use( this.paths.userRegister, require( '../routes/userRegisterRoutes' ) )
        this.app.use( this.paths.roles, require( '../routes/rolesRoutes' ) )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server running on port:', this.port )
        })
    }

}

module.exports = Server