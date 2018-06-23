const BodyParser = require('body-parser')
const Express = require('express')
const Seneca = require('seneca')
const Web = require('seneca-web')

// import routes and plugins
const { AdminRoutes, AdminPlugin } = require('./routes/admin-routes')
const { AdminPromiseRoutes, AdminPromisePlugin } = require('./routes/routes-with-promises')

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
seneca.use(AdminPromisePlugin)
seneca.use(AdminPlugin)
seneca.use(Web, config)
seneca.use('mesh')
seneca.ready(() => {
    const server = seneca.export('web/context')()

    server.listen('4000', (err) => {
        console.log(err || 'server started on: 4000')
    })
})
