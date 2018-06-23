'use strict'
const Promise = require('bluebird');

const AdminRoutes =
    {
        pin: 'role:admin,cmd:*',
        map: {
          test: {
            GET: true,
            POST: false,
            alias: '/test'
          },
          promise: {
            GET: true,
            POST: false,
            alias: '/promise'
          }
        }
    }

const AdminPlugin = function plugin (options) {
  const seneca = this;
  const act = Promise.promisify(seneca.act, {context: seneca});

  seneca.add('role:admin,cmd:test', (msg, done) => {
    this.act({role:'microservice',cmd:'promise'}, (err, msg) => {
      done(null, msg)
    })
  })

  seneca.add('role:admin,cmd:promise', (msg, done) => {
    act({role:'microservice',cmd:'test'})
      .then((msg) => {
        done(null, msg)
      })
      .catch((err) => {
        done(new Error('I have been rejected!'))
      })

  })
}

module.exports = {
    AdminRoutes,
    AdminPlugin
}
