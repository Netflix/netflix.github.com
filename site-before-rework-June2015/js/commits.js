function buildCommits() {
    if (!reposTab || !Array.isArray(reposTab)) {
        console.error("reposTab is undefined or not an array.");
        return;
    }

    const allCommits = [];
    const timelines = [];
    const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ"); // Adjust format as needed

    for (let i = 0; i < reposTab.length; ++i) {
        const thisRepo = reposTab[i].repo;
        const thisCommits = reposTab[i].commits;

        if (!thisCommits || thisCommits.length === 0) {
            console.warn(`No commits found for repo: ${thisRepo.name}`);
            continue;
        }

        for (let j = 0; j < thisCommits.length; ++j) {
            const thisCommit = thisCommits[j];
            thisCommit.repo = thisRepo.name;
            thisCommit.authorDate = parseDate(thisCommit.authorDate);
            thisCommit.commitDate = parseDate(thisCommit.commitDate);
        }

        const timeline = {
            repo: thisRepo.name,
            earliest: thisCommits[thisCommits.length - 1].commitDate,
            latest: thisCommits[0].commitDate
        };

        allCommits.push(...thisCommits);
        timelines.push(timeline);
    }

    drawChart(allCommits, timelines);
}

buildCommits();
