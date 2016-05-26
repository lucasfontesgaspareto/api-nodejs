'use strict';

const cluster = require('cluster');
const os = require('os');

const CPUs = os.cpus();

if(cluster.isMaster) {
    CPUs.forEach(() => cluster.fork());
    cluster.on('listening', worker => {
        console.log(`Cluster ${worker.process.pid} conectado.`);
    });
    cluster.on('disconnect', worker => {
        console.log(`Cluster ${worker.process.pid} desconectado.`); 
    });
    cluster.on('exit', worker => {
        console.log(`Cluster ${worker.process.pid} saiu do ar.`);
        cluster.fork(); // Start new cluster when other go out. 
    });
} else {
    require('./index.js')
}
