# Remote Jobs Aggregator

Remote developer jobs are pulled in from my favorites: StackOverflow, WeWorkRemotely, Codepen and Github.

### Features 
+ **Fastify** - a fast node.js web server framework
+ **Async** - Async for running jobs fetch in parallel
+ **Marko** - Templating engine
+ **Lasso** - For bundling

### Installation

```bash
git clone https://github.com/Marmt-Group/remote-jobs-aggregator.git
cd remote-jobs-aggregator
npm install
NODE_ENV=production node app.js --job='Full Stack' # or NODE_ENV=production node app.js --job='Front End'
open http://localhost:3000/
```