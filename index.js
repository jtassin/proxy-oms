var toxy = require('toxy')
var poisons = toxy.poisons
var rules = toxy.rules

// Create a new toxy proxy
var proxy = toxy()

// Default server to forward incoming traffic
proxy
  .forward('http://localhost:4000')

// Register global poisons and rules
proxy
  .poison(poisons.latency({ jitter: 500 }))
  .rule(rules.probability(25))

  proxy
  .all('/*')
  .poison(poisons.slowClose({ delay: 1000 }))
  .poison(poisons.slowRead({ bps: 128 }))
  .withRule(rules.probability(50))

  proxy.listen(3000)

// var rocky = require('rocky')
// const express = require('express')

// // Set up the express server
// var app = express()
// // Set up the rocky proxy
// var proxy = rocky()

// // Default proxy config
// proxy
// .all('*')
//     .forward('http://localhost:4000')
//     .options({ forwardHost: true, ws: true })

// // Configure the routes to forward/replay
// proxy
//     .all('*')

// app.use(proxy.middleware())

// app.listen(3000)

const rocky = require('rocky')


// var proxy = toxy()

// // // Default server to forward incoming traffic
// proxy
//   .forward('http://localhost:4000')

// Create a WebSocket proxy
const proxyWs = rocky({ ws: true })
// Or alternatively...
// proxy.protocol('ws')

// Note the URI protocol: 'ws://'
proxyWs
    .forward('ws://localhost:4001')


// Use a WebSocket traffic middleware
proxyWs
    .useWs(function (req, socket, head, next) {
        // Do whatever you need here...
        try {
            next()
        } catch (error) {
            console.error(erro)
        }
    })

setTimeout(() => {
    // Finally, listen on network
    proxyWs.listen(5001)
    console.log('Web socket server listening on port: 3000')

}, 5e3);

setTimeout(() => {
    process.exit(-1)
}, 20000);

