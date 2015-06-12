var showingBalloonIndex = -1;
var shouldBeShowingBalloonIndex = -1;

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results)
    { 
        return 0; 
    }
    return results[1] || 0;
}

function repoView(thumbView)
{
	if ( thumbView )
	{
		$('#repo-content').show();
		$('#repo-list-content').hide();
	}
	else
	{
		$('#repo-content').hide();
		$('#repo-list-content').show();
	}
	return false;
}

function removeBalloon()
{
	$('#balloon-container').hide();
	$('#balloon-arrow-left').hide();
	$('#balloon-arrow-right').hide();
	showingBalloonIndex = -1;
}

function displayBalloon(index)
{
	if ( showingBalloonIndex === index )
	{
		return;
	}
	showingBalloonIndex = index;
	
    var thisRepo = reposTab[index].repo;
    var updatedAt = parseISO8601(thisRepo.updated_at);
	var updatedStr = $.format.date(updatedAt, "MM/dd/yy") + ' ' + $.format.date(updatedAt, "@HH:mm:ss");

	$('#balloon-heading').text(thisRepo.name);
	$('#balloon-description').html(thisRepo.description + ' ' + '<span class="more-info"><a href="' + thisRepo.html_url + '">More&nbsp;Info</a></span>');
	$('#balloon-watchers').text(thisRepo.watchers);
	$('#balloon-forks').text(thisRepo.forks);
	$('#balloon-language').text(thisRepo.language);
	$('#balloon-issues').text(thisRepo.open_issues);
	$('#balloon-updated').text(updatedStr);
	
	var windowWidth = $(window).width();
	var offset = $('#repo-id-' + index).offset();
	var width = $('#repo-id-' + index).width();
	
	if ( offset.left < (windowWidth - 600) )
	{
		$('#balloon-container').css('left', offset.left + width + 52);
		$('#balloon-container').css('top', offset.top + 10);
		$('#balloon-arrow-left').css('left', offset.left + width + 5);
		$('#balloon-arrow-left').css('top', offset.top + 50);

		$('#balloon-container').show();
		$('#balloon-arrow-left').show();
		$('#balloon-arrow-right').hide();
	}
	else
	{
		$('#balloon-container').css('left', offset.left - 329);
		$('#balloon-container').css('top', offset.top + 10);
		$('#balloon-arrow-right').css('left', offset.left - 38);
		$('#balloon-arrow-right').css('top', offset.top + 50);

		$('#balloon-container').show();
		$('#balloon-arrow-left').hide();
		$('#balloon-arrow-right').show();
	}
}	

function showBalloon(index)
{
	shouldBeShowingBalloonIndex = index;
}

function hideBalloon()
{
	shouldBeShowingBalloonIndex = -1;
}

function adjustBalloon()
{
	if ( shouldBeShowingBalloonIndex != showingBalloonIndex )
	{
		if ( shouldBeShowingBalloonIndex < 0 )
		{
			removeBalloon();
		}
		else
		{
			displayBalloon(shouldBeShowingBalloonIndex);
		}
	}
}

function isTabCode(str, item)
{
	return str && item && (str.indexOf(item.code) == 0);
}

function showTab(which)
{	
	for ( var i = 0; i < tabs.length; ++i )
	{
		var item = tabs[i];
		if ( isTabCode(which, item) )
		{
			if ( item.handler )
			{
				item.handler(which);
			}
			else
			{
				$('#' + item.id).show();
				location.hash = item.code;
			}
		}
		else
		{
			$('#' + item.id).hide();
		}
	}	
}

function parseISO8601(value) {
    a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
    if (a)
         return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));

    if (value.slice(0, 5) === 'Date(' && value.slice(-1) === ')') {
       var d = new Date(value.slice(5, -1));

       if (d)
          return d;
    }
    return new Date();
  }

function buildRepoContent()
{
	var imageUrl, boxArtOverride, i;
	var imageFileName = "";
    var repoContent = "";
	var boxArtIndex = 0;
	var previousImageFileName = "";

    $.each(categories, function(i, category) {
        repoContent += '<div class="category"><h2>' + category.name + '</h2>';
        $.each(category.projects, function(j, project) {
            var thisRepo = project.repo;
            var index = project.repoIndex;
            boxArtOverride = thisRepo.metadata.boxArt;
            if (boxArtOverride) {
                imageFileName = boxArtOverride;
            }
            while ( imageFileName === previousImageFileName )
            {
                imageFileName = 'box-art-' + boxArtIndex + '.jpg'
                boxArtIndex++;
                if (boxArtIndex > 8) {
                    boxArtIndex = 0;
                }
            }

            imageUrl = 'assets/' + imageFileName;
            previousImageFileName = imageFileName;

            repoContent += '<a class="standard-anchor" href="' + thisRepo.html_url + '">';
            repoContent += '<div class="repo-item-container">';
            repoContent += '<div id="repo-container-id-' + index + '" class="repo-item-name">' + thisRepo.name + '</div>';
            repoContent += '<div id="repo-id-' + index + '" class="repo-item" style="background-image: url(' + imageUrl + ')">';
                repoContent += '<div id="repo-cover-id-' + index + '" class="repo-item-cover"><div class="repo-item-shadow"></div></div>';
                repoContent += '<div id="repo-button-id-' + index + '" class="repo-item-button"></div>';
            repoContent += '</div></a>';
            repoContent += '</div>';
        });
        repoContent += '</div>';
    });
    $('#repo-content').html(repoContent);

    for ( i = 0; i < reposTab.length; ++i )
    {
        var coverId = '#repo-cover-id-' + i;
        var buttonId = '#repo-button-id-' + i;
        $('#repo-id-' + i).data('cover-id', coverId);
        $('#repo-id-' + i).data('button-id', buttonId);
        $('#repo-id-' + i).data('index', i);
        $('#repo-id-' + i).hover(function(){
            var coverId = $(this).data('cover-id');
            var buttonId = $(this).data('button-id');
            var index = $(this).data('index');
            $(coverId).show();
            $(buttonId).show();
			showBalloon(index);
        }, function(){
            var coverId = $(this).data('cover-id');
            var buttonId = $(this).data('button-id');
            $(coverId).hide();
            $(buttonId).hide();
			hideBalloon();
        });
    }
}

function buildRepoListContent()
{
    var repoListContent = "";
    $.each(categories, function(i, category) {
        repoListContent += '<div class="category"><h2>' + category.name + '</h2>';
        $.each(category.projects, function(j, project) {
            var thisRepo = project.repo;
            var updatedAt = parseISO8601(thisRepo.updated_at);
            var updatedStr = $.format.date(updatedAt, "MM/dd/yy") + ' ' + $.format.date(updatedAt, "@HH:mm:ss");

            repoListContent += '<div class="repo-list-item-container" onClick="location.href=\'' + thisRepo.html_url + '\'; return false;">';
            repoListContent += '<div><a class="repo-list-item-anchor" href="' + thisRepo.html_url + '">' + thisRepo.name + '</a></div>';
            repoListContent += '<div class="repo-list-item-description">' + thisRepo.description + '</div>';
            // GitHub JSON data only reports counts of Stars, not Watchers, although the JSON data mislabels the numbers as "watchers"
            repoListContent += '<div><span class="repo-list-item-label">Stars: </span><span class="repo-list-item-value">' + thisRepo.watchers + '</span></div>';
            repoListContent += '<div><span class="repo-list-item-label">Forks: </span><span class="repo-list-item-value">' + thisRepo.forks + '</span></div>';
            repoListContent += '<div><span class="repo-list-item-label">Language: </span><span class="repo-list-item-value">' + thisRepo.language + '</span></div>';
            repoListContent += '<div><span class="repo-list-item-label">Open Issues: </span><span class="repo-list-item-value">' + thisRepo.open_issues + '</span></div>';
            repoListContent += '<div><span class="repo-list-item-label">Updated: </span><span class="repo-list-item-value">' + updatedStr + '</span></div>';
            repoListContent += '</div>';
        });
        repoListContent += '</div>';
    });
    $('#repo-list-content').html(repoListContent);
}

function buildRepoMailingListContent()
{
    var content = "";
    for ( var i = 0; i < reposTab.length; ++i )
	{
        var thisRepo = reposTab[i].repo;
		if ( thisRepo.metadata.mailingListUrl )
		{
			content += '<li><a href="' + thisRepo.metadata.mailingListUrl + '"><strong><i>' + thisRepo.name + '</i></strong> Mailing List</a></li>';
		}
	}

    $('#lists-repos').html(content);
}

function buildPoweredByContent()
{
	var content = "";
	for ( var i = 0; i < poweredBy.length; ++i )
	{
		var item = poweredBy[i];
		
		content += '<div class="powered-by-item" id=powered-by-item-' + i + '>';
		content += '<a class="standard-anchor" href="' + item.url + '">';
		content += '<div class="powered-by-item-image">';
		content += '<img alt="' + item.name + '" src="' + item.image.url + '" width="' + item.image.width + '" height="' + item.image.height + '" border="0">';
		content += '</div>';
		content += "</a>";
		content += '</div>';
	}
	
	$('#content-powered-by').html(content);
}

function getRepoUrl(name)
{
	name = name.toUpperCase();
    for ( var i = 0; i < reposTab.length; ++i )
	{
        var thisRepo = reposTab[i].repo;
		if ( thisRepo.name.toUpperCase() == name )
		{
			return thisRepo.html_url;
		}
	}
	return "#";
}

function buildCommunityTable()
{
	outsideProjects.sort(function(rhs, lhs){
		var diff = (rhs.netflixName.toUpperCase() < lhs.netflixName.toUpperCase()) ? -1 : ((rhs.netflixName.toUpperCase() > lhs.netflixName.toUpperCase()) ? 1 : 0);
		if ( diff == 0 )
		{
			diff = (rhs.name.toUpperCase() < lhs.name.toUpperCase()) ? -1 : ((rhs.name.toUpperCase() > lhs.name.toUpperCase()) ? 1 : 0);
		}
		return diff;
	});
	
	var content = '';
	var currentNetflixName = null;
	
	content += '<table id="community-table" class="display-table">';
	for ( var i = 0; i < outsideProjects.length; ++i )
	{
		var item = outsideProjects[i];
		
		if ( item.netflixName != currentNetflixName )
		{
			currentNetflixName = item.netflixName;
			
			var netflixRowStyle = (i == 0) ? 'display-table-row' : 'display-table-row-secondary';
			content += '<tr class="' + netflixRowStyle + '"><td class="display-table-cell" colspan="2">';
			if ( item.netflixName.length > 0 )
			{
				content += '<a href="' + getRepoUrl(item.netflixName) + '">' + item.netflixName + "</a>";
			}
			else
			{
				content += 'Recipes based on Netflix OSS';
			}
			content += '</td></tr>';
		}
		
		content += '<tr class="display-table-item-row">';
		content += '<td class="display-table-item-row-cell-0"><a href="' + item.url + '">' + item.name + "</a></td>";
		content += '<td class="display-table-item-row-cell-1">' + item.description + "</td>";
		content += '</tr>';
	}
	
	content += '</table>';
	content += '<p>&nbsp;</p>';
	
	$('#community-table-content').html(content);
}

function buildAroundTheWeb()
{
	webLinks.sort(function(rhs, lhs){
		var diff = (rhs.netflixName.toUpperCase() < lhs.netflixName.toUpperCase()) ? -1 : ((rhs.netflixName.toUpperCase() > lhs.netflixName.toUpperCase()) ? 1 : 0);
		if ( diff == 0 )
		{
			diff = (rhs.text.toUpperCase() < lhs.text.toUpperCase()) ? -1 : ((rhs.text.toUpperCase() > lhs.text.toUpperCase()) ? 1 : 0);
		}
		return diff
	});

	var content = '';
	var currentNetflixName = '';
	
	content += '<table id="web-table" class="display-table">';
	
	for ( var i = 0; i < webLinks.length; ++i )
	{
		var item = webLinks[i];
		
		if ( item.netflixName != currentNetflixName )
		{
			currentNetflixName = item.netflixName;
			
			var netflixRowStyle = (i == 0) ? 'display-table-row' : 'display-table-row-secondary';
			content += '<tr class="' + netflixRowStyle + '"><td class="display-table-cell">';
			content += '<a href="' + getRepoUrl(item.netflixName) + '">' + item.netflixName + "</a>";
			content += '</td></tr>';
		}
		
		content += '<tr class="display-table-item-row">';
		content += '<td class="display-table-item-row-cell-0"><li><a href="' + item.url + '">' + item.text + "</a></td>";
		content += '</tr>';
	}
	
	content += '</table>';	
	content += "<p>&nbsp;</p>";
	
	$('#web-table-content').html(content);
}

function setStats()
{
	var stats = "";
	
	stats = stats + "<div><a href=\"https://github.com/Netflix\">" + reposTab.length + " public repos</a></div>";
	stats = stats + "<div><a href=\"https://github.com/Netflix?tab=members\">" + membersTab.length + " members</a></div>";
	
	$('#repstats').html(stats);
}

function buildTabs()
{
	var content = "";
	for ( var i = 0; i < tabs.length; ++i )
	{
		content += '<a href="#' + tabs[i].code + '" onClick="showTab(\'' + tabs[i].code + '\'); return false;">';
		content += '<div class="sub-header-item">' + tabs[i].text + '</div>';
		content += '</a>';
	}
	
	$('#sub-header').html(content);
}

function getViewParam()
{
	if ( location.hash )
	{
		return location.hash.substring(1);
	}
	return tabs[0].code;
}

function categorize() {
    if (!$.isArray(categories)) {
        var cats = [];
        $.each(categories, function(category, projects) {
            cats.push({
                name: category,
                projects: $.map(projects, function(name) {
                    return {name: name};
                })
            });
        });
        categories = cats;
    }
    $.each(categories, function(i, category) {
        $.each(category.projects, function(j, project) {
            var name = project.name;
            $.each(reposTab, function(k, repo) {
                if (repo.repo.name === name) {
                    project.repo = repo.repo;
                    project.repoIndex = k;
                }
            });
            if (!project.repo) {
                console.error('no repo found', project);
            }
        });
        category.projects = $.grep(category.projects, function(project) {
            return !!project.repo;
        });
    });
}

$(function(){
	if ( $.urlParam('view') )
	{
		location.href = "/#" + $.urlParam('view');
		return;
	}

    categorize();
	buildTabs();
	buildRepoContent();
	buildRepoListContent();
	buildRepoMailingListContent();
	buildCommunityTable();
	buildPoweredByContent();
	buildAroundTheWeb();

	$(window).resize(function(){
	    hideBalloon();
	});
	setStats();
	
	$('#year').text(new Date().getFullYear());
	window.setInterval("adjustBalloon()", 500);
	$('#balloon-container').hover(function(){
		shouldBeShowingBalloonIndex = showingBalloonIndex;
	},function(){
		shouldBeShowingBalloonIndex = -1;
	});
	
	showTab(getViewParam());
	
	$(window).on('hashchange', function() {
		showTab(getViewParam());
	});
});
