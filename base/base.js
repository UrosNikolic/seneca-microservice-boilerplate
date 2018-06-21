// node base.js base0 39000 127.0.0.1 127.0.0.1:39000,127.0.0.1:39001
// node base.js base1 39001 127.0.0.1 127.0.0.1:39000,127.0.0.1:39001

const TAG = process.env.TAG || process.argv[2] || 'base'
const PORT = process.env.PORT || process.argv[3] || 39999
const HOST = process.env.HOST || process.argv[4] || '127.0.0.1'
const BASES = (process.env.BASES || process.argv[5] || '').split(',')
const SILENT = process.env.SILENT || process.argv[6] || 'true'


require('seneca')({
    tag: TAG,
    internal: {logger: require('seneca-demo-logger')},
    debug: {short_logs:true}
})
    .use('mesh',{
        isbase: true,
        port: PORT,
        host: HOST,
        bases: BASES,
        pin:'role:mesh',
        monitor: true,
        sneeze: {
            silent: JSON.parse(SILENT),
            swim: {interval: 1111}
        }
    })
    .ready(function(){
        console.log(this.id)
    })
