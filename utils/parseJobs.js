/**
 * @param  {} feeds
 */
const parseJobs = (feeds, jobQuery) => {

    const date = new Date(); 

    const sortByDate = ((a, b) => {
        if (a.date) {
            return new Date(b.date) - new Date(a.date)
        } else if (a.created_at) {
            return new Date(b.created_at) - new Date(a.created_at)
        }
    })

    const sortByRemote = (value => value.remote == true)

    const sortByTitle = (value) => {
        switch (jobQuery.toLowerCase()) {
            case 'full stack':
                return value.title.match(/Full Stack|full stack|Full-stack|full-stack|Senior Full Stack|senior full stack/g)
            case 'front end':
                return value.title.match(/Front End|front end|Front-end|front-end|Frontend|Senior Front End|Sr. Front End/g)
            default:
                return value.title.match(/Front End|front end|Front-end|front-end|Frontend|Senior Front End|Sr. Front End/g)
        } 
    }

    feeds.github.value.forEach(element => {
        const date = new Date(element.created_at);
        element.created_at = date
    })

    return {
        github: feeds.github.value.filter(sortByTitle).sort(sortByDate), 
        wwremotely: feeds.wwremotely.value.items.filter(sortByTitle).sort(sortByDate),
        stackoverflow: feeds.stackoverflow.value.items.filter(sortByTitle).sort(sortByDate),
        codepen: feeds.codepen.value.jobs.filter(sortByRemote).filter(sortByTitle),
        recentDate: date.setDate(date.getDate() - 10)
    }
}

module.exports = parseJobs