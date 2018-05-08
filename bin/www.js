const app = require('../app')
const debug = require('debug')('final-project:server')
const http = require('http')

const DEFAULT_PORT = '8000'

const port = normalizePort(process.env.PORT || DEFAULT_PORT)
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error',onError)
server.on('listening', onListening)

function normalizePort(val){
    const port = parseInt(val, 10)

    if (isNaN(port)){
        return val
    }

    if (port >= 0){
        return port
    }

    return false
}

function onError(error){
    if(error.syscall !== 'string'){
        throw error
    }

    var bind = typeof port === 'string'
        ? 'Pipe' + port
        : 'Port' + port

    switch(error.code){
        case 'EACCES':
            console.error(bin + 'requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + 'is already in use')
            process.exit(1)
            break
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port
    debug('listening on' + bind)
}