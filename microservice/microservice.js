const Seneca = require('seneca')
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'
var HOST = process.env.HOST || process.argv[4] || '127.0.0.1'

Seneca({
    tag: 'microservice',
    internal: {logger: require('seneca-demo-logger')},
    debug: {short_logs: true}
})
    .use('mesh',{
        pin: 'role:microservice',
        bases: BASES,
        host: HOST,
        sneeze: {
            silent: JSON.parse(SILENT),
            swim: {interval: 1111}
        }
    })
    .ready(function(){
        console.log(this.id)
        this.add({cmd:'test'}, (args, done) => {
            done({message: 'Test microservice responds to api gateway /test route.'});
        })
    })



