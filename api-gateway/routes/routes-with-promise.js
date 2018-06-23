'use strict'
const Promise = require('bluebird');

const AdminPromiseRoutes =
  {
    pin: 'role:adminPromise,cmd:*',
    map: {
      promise: {
        GET: true,
        POST: false,
        alias: '/promise'
      }
    }
  }

const AdminPromisePlugin = function plugin (options) {
  const seneca = this;
  const act = Promise.promisify(seneca.act, {context: seneca});

  seneca.add('role:adminPromise,cmd:promise', (msg, done) => {
    act({role:'microservice',cmd:'promise'})
      .then((msg) => {
        done(null, msg)
      })
      .catch((err) => {
        done(new Error('I have been rejected!'))
      })

  })
}

module.exports = {
  AdminPromiseRoutes,
  AdminPromisePlugin
}
