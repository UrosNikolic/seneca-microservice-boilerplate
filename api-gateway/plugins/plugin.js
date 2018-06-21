'use strict'

module.exports = function plugin (options) {
    var seneca = this;

    seneca.add('role:admin,cmd:home', (msg, done) => {
        done(null, {ok: true, message: 'please log in...'})
    })

    seneca.add('role:admin,cmd:profile', (msg, done) => {
        console.log('prooffile')
        this.act({role:'test2',cmd:'provide'}, (err, msg) => {
            done(null, msg)
        })

    })
}