const BodyParser = require('body-parser')
const Express = require('express')
const Seneca = require('seneca')
const Web = require('seneca-web')

// load env file
require('dotenv').config()

// import routes and plugins
const { AdminRoutes, AdminPlugin } = require('./routes/admin-routes')
const { AdminPromiseRoutes, AdminPromisePlugin } = require('./routes/routes-with-promises')

//define routes
const Routes = [
  AdminRoutes,
  AdminPromiseRoutes
]

const app = Express()
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

const config = {
    adapter: require('seneca-web-adapter-express'),
    // auth: Passport,
    context: app,
    options: { parseBody: false },
    routes: Routes
}

const seneca = Seneca()

// define plugins
seneca.use(AdminPromisePlugin)
seneca.use(AdminPlugin)

seneca.use(Web, config)
seneca.use('mesh')
seneca.ready(() => {
    const server = seneca.export('web/context')()

    server.listen(process.env.PORT, (err) => {
        console.log(err || `server started on: ${process.env.PORT}`)
    })
})
