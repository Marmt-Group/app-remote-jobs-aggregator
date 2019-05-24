const async = require('async')
const fetch = require('node-fetch')
const parser = require('node-feedparser') //for parsing rss/xml
const {
    performance
} = require('perf_hooks')
const buildHTML = require('./utils/buildHtml')
const parseJobs = require('./utils/parseJobs')


/**
 * Retrieve jobs from feeds using async module. When all are retrieved callback is fired. 
 */
const retrieveJobs = () => {
    // const startTime = performance.now()
    // console.log('Starting ops...')
    const feeds = {
        wwremotely: (callback) => {
            fetch('https://weworkremotely.com/categories/remote-programming-jobs.rss')
                .catch(error => {
                    return callback(error || new Error('Response non-200'));
                })
                .then(res => res.text())
                .then(body => {
                    parser(body, (error, ret) => {
                        if (error) {
                            return callback(error || new Error('Response non-200'));
                        }
                        return callback(null, ret)
                    })
                })

        },
        github: (callback) => {
            fetch('https://jobs.github.com/positions.json?description=&location=remote')
                .catch(error => {
                    return callback(error || new Error('Response non-200'));
                })
                .then(res => res.json())
                .then(body => {
                    return callback(null, body);
                })
                
        },
        stackoverflow: (callback) => {
            fetch('https://stackoverflow.com/jobs/feed?l=Remote')
                .catch(error => {
                    return callback(error || new Error('Response non-200'));
                })
                .then(res => res.text())
                .then(body => {
                    parser(body, (error, ret) => {
                        if (error) {
                            return callback(error || new Error('Response non-200'));
                        }
                        return callback(null, ret)
                    })
                })
        },
        codepen: (callback) => {
            fetch('https://codepen.io/jobs.json')
                .catch(error => {
                    return callback(error || new Error('Response non-200'));
                })
                .then(res => res.json())
                .then(body => {
                    return callback(null, body);
                })
        }
    }
    /**
     * @param  {} async.reflectAll // continues the execution of other tasks when a task fails.
     */
    async.parallel(async.reflectAll(feeds),
        (err, results) => {
            if (err) console.error(err)
            //console.log(`Finished. Elapsed time: ${Math.floor(performance.now() - startTime)} miliseconds.`)
            // buildHTML(parseJobs(results, ['Front End Developer','Front-end Developer', 'Senior Front End Developer']))
            buildHTML(parseJobs(results))
        })
}

retrieveJobs()