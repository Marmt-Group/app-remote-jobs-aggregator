const path = require('path');
const app = require('fastify')({
    logger: true
})
const retrieveJobs = require('./utils/retrieveJobs')

const isProduction = process.env.NODE_ENV === 'production'
const outputDir = path.join(__dirname, 'static')
const argv = require('yargs').argv
const jobQuery = argv.job ? argv.job : 'Front end';

require('lasso').configure({
    plugins: [
        'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
    ],
    outputDir: outputDir,
    bundlingEnabled: isProduction,
    minify: isProduction,
    fingerprintsEnabled: isProduction,
});

// Register marko template engine
app.register(require("point-of-view"), {
    engine: {
        marko: require("marko")
    }
});

// Register static file directory
app.register(require('fastify-static'), {
    root: outputDir,
    prefix: '/static'
});

// Get Routes
app.get('/', async (request, reply) => {
    await retrieveJobs(jobQuery).then((result) => {
        //console.log(result.stackoverflow)
        reply.view('/templates/index.marko', result)
    }, (err) => {
        console.error(err);
    })
    
});

// Start server
app.listen(3000, (err, address) => {
    if (err) throw err
    app.log.info(`server listening on ${address}`)
})