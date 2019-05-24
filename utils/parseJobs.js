/**
 * @param  {} feeds
 */
const parseJobs = (feeds) => {

    const sortByTitle = (value) => {
        return value.title.match(/Front End|front end|Front-end|front-end|Senior Front End|Sr. Front End/g)
    }

    return {
        github: feeds.github.value.filter(sortByTitle), 
        wwremotely: feeds.wwremotely.value.items.filter(sortByTitle),
        stackoverflow: feeds.stackoverflow.value.items.filter(sortByTitle),
        codepen: feeds.codepen.value.jobs.filter(sortByTitle)
    }
}

module.exports = parseJobs