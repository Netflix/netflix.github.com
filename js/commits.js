function buildCommits()
{
  var allCommits = [];
  var timelines = [];
    for ( var i = 0; i < reposTab.length; ++i )
	{
        var thisRepo = reposTab[i].repo;
        var thisCommits = reposTab[i].commits;
		for ( var j = 0; j < thisCommits.length; ++j )
		{
			var thisCommit = thisCommits[j];
			thisCommit.repo = thisRepo.name;
			thisCommit.authorDate = d3.time.format.iso.parse(thisCommit.authorDate);
			thisCommit.commitDate = d3.time.format.iso.parse(thisCommit.commitDate);
		}
	    var timeline = {
	      repo: thisRepo.name,
	      earliest: thisCommits[thisCommits.length - 1].commitDate,
	      latest: thisCommits[0].commitDate
	    };
	    allCommits.push.apply(allCommits, thisCommits);
	    timelines.push(timeline);
	}
	drawChart(allCommits, timelines);
}

buildCommits();
