/**
 * @param  {} feeds
 */
const parseJobs = (feeds, jobQuery) => {

    const sortByTitle = (value) => {
        switch (jobQuery.toLowerCase()) {
            case 'full stack':
                return value.title.match(/Full Stack|full stack|Full-stack|full-stack|Senior Full Stack|senior full stack/g)
            case 'front end':
                return value.title.match(/Front End|front end|Front-end|front-end|Senior Front End|Sr. Front End/g)
            default:
                return value.title.match(/Front End|front end|Front-end|front-end|Senior Front End|Sr. Front End/g)
        } 
    }

    const codepenJobs = feeds.codepen.value.jobs.filter(value => value.remote == true)

    return {
        github: feeds.github.value.filter(sortByTitle), 
        wwremotely: feeds.wwremotely.value.items.filter(sortByTitle),
        stackoverflow: feeds.stackoverflow.value.items.filter(sortByTitle),
        codepen: codepenJobs.filter(sortByTitle)
    }
}

module.exports = parseJobs