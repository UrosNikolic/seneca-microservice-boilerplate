'use strict'

const AdminRoutes =
    {
        pin: 'role:admin,cmd:*',
        map: {
            test: {
                GET: true,
                POST: false,
                alias: '/test'
            }
        }
    }

const AdminPlugin = function plugin (options) {
    const seneca = this;

    seneca.add('role:admin,cmd:test', (msg, done) => {
        this.act({role:'microservice',cmd:'test'}, (err, msg) => {
            done(null, msg)
        })

    })
}

module.exports = {
    AdminRoutes,
    AdminPlugin
}