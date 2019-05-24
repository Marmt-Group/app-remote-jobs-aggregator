# Remote Jobs Aggregator

Remote developer jobs are pulled in from my favorites: StackOverflow, WeWorkRemotely, Codepen and Github.

### Features 
+ **Fastify** - a fast node web server framework
+ **Async** - Async for running jobs fetch in parallel
+ **Marko** - Templating engine
+ **Lasso** - For bundling

### Installation

```bash
git clone https://github.com/david-j-davis/remote-jobs-aggregator.git
cd remote-jobs-aggregator
npm install
NODE_ENV=production node app.js --job='Full Stack' # or NODE_ENV=production node app.js --job='Front End'
```