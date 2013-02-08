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

function showListContent()
{
	$('#tab-content-repo').hide();
    $('#tab-content-timeline').hide();
	$('#tab-content-lists').show();
	$('#tab-content-community').hide();
	$('#tab-content-powered-by').hide();
}

function showRepoContent()
{
	$('#tab-content-lists').hide(); 
    $('#tab-content-timeline').hide();
	$('#tab-content-repo').show(); 
	$('#tab-content-community').hide();
	$('#tab-content-powered-by').hide();
	resizeRepoContent();
}

function showTimelineContent() {
    $('#tab-content-repo').hide(); 
    $('#tab-content-lists').hide(); 
    $('#tab-content-timeline').show();
	$('#tab-content-community').hide();
	$('#tab-content-powered-by').hide();
}

function showCommunityContent()
{
    $('#tab-content-repo').hide(); 
    $('#tab-content-lists').hide(); 
    $('#tab-content-timeline').hide();
	$('#tab-content-community').show();
	$('#tab-content-powered-by').hide();
	resizeCommunityContent();
}

function showPoweredByContent() {
    $('#tab-content-repo').hide(); 
    $('#tab-content-lists').hide(); 
    $('#tab-content-timeline').hide();
	$('#tab-content-community').hide();
	$('#tab-content-powered-by').show();
	resizePoweredByContent();
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

function resizePoweredByContent()
{
	$('#content-powered-by').css({'height':(($(window).height())-310)+'px'});
}

function resizeCommunityContent()
{
	$('#community-table-content').css({'height':(($(window).height())-350)+'px'});
}

function resizeRepoContent()
{
	$('#repo-content').css({'height':(($(window).height())-320)+'px'});
	$('#repo-list-content').css({'height':(($(window).height())-320)+'px'});
}

function buildRepoContent()
{
	var imageUrl, imageFileName, boxArtOverride, i;
    var repoContent = "";
	var boxArtIndex = 0;
    for (i = 0; i < reposTab.length; ++i )
    {
        var thisRepo = reposTab[i].repo;
    	boxArtOverride = thisRepo.metadata.boxArt;
    	if (boxArtOverride) {
    		imageFileName = boxArtOverride;
    	} else {
    		imageFileName = 'box-art-' + boxArtIndex + '.jpg'
    		boxArtIndex++;
        	if (boxArtIndex > 8) {
				boxArtIndex = 0;
			}
    	}
    	imageUrl = 'assets/' + imageFileName;

        repoContent += '<a class="standard-anchor" href="' + thisRepo.html_url + '">';
        repoContent += '<div class="repo-item-container">';
    	repoContent += '<div id="repo-container-id-' + i + '" class="repo-item-name">' + thisRepo.name + '</div>';
        repoContent += '<div id="repo-id-' + i + '" class="repo-item" style="background-image: url(' + imageUrl + ')">';
            repoContent += '<div id="repo-cover-id-' + i + '" class="repo-item-cover"><div class="repo-item-shadow"></div></div>';
            repoContent += '<div id="repo-button-id-' + i + '" class="repo-item-button"></div>';
        repoContent += '</div></a>';
        repoContent += '</div>';
    }
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
    for ( i = 0; i < reposTab.length; ++i )
	{
        var thisRepo = reposTab[i].repo;
	    var updatedAt = parseISO8601(thisRepo.updated_at);
		var updatedStr = $.format.date(updatedAt, "MM/dd/yy") + ' ' + $.format.date(updatedAt, "@HH:mm:ss");

        repoListContent += '<div class="repo-list-item-container" onClick="location.href=\'' + thisRepo.html_url + '\'; return false;">';
        repoListContent += '<div><a class="repo-list-item-anchor" href="' + thisRepo.html_url + '">' + thisRepo.name + '</a></div>';
        repoListContent += '<div class="repo-list-item-description">' + thisRepo.description + '</div>';
        repoListContent += '<div><span class="repo-list-item-label">Watchers: </span><span class="repo-list-item-value">' + thisRepo.watchers + '</span></div>';
        repoListContent += '<div><span class="repo-list-item-label">Forks: </span><span class="repo-list-item-value">' + thisRepo.forks + '</span></div>';
        repoListContent += '<div><span class="repo-list-item-label">Language: </span><span class="repo-list-item-value">' + thisRepo.language + '</span></div>';
        repoListContent += '<div><span class="repo-list-item-label">Open Issues: </span><span class="repo-list-item-value">' + thisRepo.open_issues + '</span></div>';
        repoListContent += '<div><span class="repo-list-item-label">Updated: </span><span class="repo-list-item-value">' + updatedStr + '</span></div>';
		repoListContent += '</div>';
	}
	
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

function addPoweredBy(tab, name, netflixNames, url, imageUrl, width, height)
{
	var item = {};
	item.name = name;
	item.netflixNames = netflixNames;
	item.url = url;
	item.image = {};
	item.image.url = imageUrl;
	item.image.width = width;
	item.image.height = height;
	
	tab.push(item);
}

function buildPoweredByContent()
{
	var poweredBy = new Array();
	addPoweredBy(poweredBy, "Maginatics", "Curator", "http://maginatics.com/", "assets/powered/maginatics.png", 210, 140);
	addPoweredBy(poweredBy, "UserEvents", "Curator", "http://www.userevents.com/", "assets/powered/userevents.png", 310, 65);
	addPoweredBy(poweredBy, "Bazaarvoice", "Curator", "http://www.bazaarvoice.com/", "assets/powered/bazaarvoice.png", 193, 50);
	addPoweredBy(poweredBy, "OpenSCG", "Curator", "http://www.openscg.com/", "assets/powered/openscg.png", 242, 54);
	
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

function addOutsideProject(tab, name, netflixName, url, description)
{
	var item = {};
	item.name = name;
	item.netflixName = netflixName;
	item.url = url;
	item.description = description;
	
	tab.push(item);
}

function getRepoUrl(name)
{
	name = name.toUpperCase();
    for ( var i = 0; i < reposTab.length; ++i )
	{
        var thisRepo = reposTab[i].repo;
		if ( thisRepo.name.toUpperCase() == name)
		{
			return thisRepo.html_url;
		}
	}
	return "#";
}

function buildCommunityTable()
{
	var outsideProjects = new Array();
	addOutsideProject(outsideProjects, 'Flux Capacitor', '', 'https://github.com/cfregly/fluxcapacitor', 'Java-based reference app demonstrating many Netflix Open Source components.');
	
	addOutsideProject(outsideProjects, 'Galaxy', 'Curator', 'http://puniverse.github.com/galaxy/about.html', 'A high-performance in-memory data-grid (IMDG) that can serve as a basis for building distributed applications that require fine-tuned control over data placement and/or custom distributed data-structures.');
	addOutsideProject(outsideProjects, 'Storm', 'Curator', 'https://github.com/nathanmarz/storm', 'A distributed realtime computation system.');
	addOutsideProject(outsideProjects, 'Apache James Mailbox', 'Curator', 'http://james.apache.org/mailbox/index.html', 'A library providing a flexible Mailbox storage accessible by mail protocols (IMAP4, POP3, SMTP,...) and other protocols.');
	addOutsideProject(outsideProjects, 'Dubbo', 'Curator', 'http://code.alibabatech.com/wiki/display/dubbo/Home', 'A distributed service framework empowers applications with service import/export capability with high performance RPC.');
	addOutsideProject(outsideProjects, 'Palomino Benchpress', 'Curator', 'https://github.com/palominolabs/benchpress', 'Distributed load testing tool.');
	addOutsideProject(outsideProjects, 'Druid', 'Curator', 'https://github.com/metamx/druid', 'Metamarkets Druid Data Store.');
	addOutsideProject(outsideProjects, 'Chef-ZooKeeper', 'Exhibitor', 'https://github.com/SimpleFinance/chef-zookeeper', 'Installs and configures ZooKeeper and Exhibitor.');
	addOutsideProject(outsideProjects, 'ZCache', 'Curator', 'https://github.com/NiceSystems/zcache', 'A simple cache implementation on top of ZooKeeper.');
	addOutsideProject(outsideProjects, 'Titan Graph Database', 'Astyanax', 'https://github.com/thinkaurelius/titan', 'A highly scalable graph database optimized for storing and querying large graphs with billions of vertices and edges distributed across a multi-machine cluster.');
	
	outsideProjects.sort(function(rhs, lhs){
		var i = (rhs.netflixName.toUpperCase() < lhs.netflixName.toUpperCase()) ? -1 : ((rhs.netflixName.toUpperCase() > lhs.netflixName.toUpperCase()) ? 1 : 0);
		if ( i == 0 )
		{
			i = (rhs.name.toUpperCase() < lhs.name.toUpperCase()) ? -1 : ((rhs.name.toUpperCase() > lhs.name.toUpperCase()) ? 1 : 0);
		}
		return i;
	});
	
	var content = '';
	var currentNetflixName = null;
	
	for ( var i = 0; i < outsideProjects.length; ++i )
	{
		var item = outsideProjects[i];
		
		if ( item.netflixName != currentNetflixName )
		{
			currentNetflixName = item.netflixName;
			
			var netflixRowStyle = (i == 0) ? 'community-netflix-row' : 'community-netflix-row-secondary';
			content += '<tr class="' + netflixRowStyle + '"><td class="community-netflix-cell" colspan="2">';
			if ( item.netflixName.length > 0 )
			{
				content += '<a href="' + getRepoUrl(item.netflixName) + '">' + item.netflixName + "</a>";
			}
			else
			{
				content += '<i>Recipes based on Netflix OSS</i>';
			}
			content += '</td></tr>';
		}
		
		content += '<tr class="community-item-row">';
		content += '<td class="community-item-row-cell-0"><a href="' + item.url + '">' + item.name + "</a></td>";
		content += '<td class="community-item-row-cell-1">' + item.description + "</td>";
		content += '</tr>';
	}
	
	$('#community-table').html(content);
}

function setStats()
{
	var stats = "";
	
	stats = stats + "<div><a href=\"https://github.com/Netflix\">" + reposTab.length + " public repos</a></div>";
	stats = stats + "<div><a href=\"https://github.com/Netflix?tab=members\">" + membersTab.length + " members</a></div>";
	
	$('#repstats').html(stats);
}

function handleViewParameter()
{
	if ( $.urlParam('view') )
	{
		if ( $.urlParam('view') === "repo" )
		{
			showRepoContent();
		}
		else if ( $.urlParam('view') === "timeline" )
		{
			showTimelineContent();
		}
		else if ( $.urlParam('view') === "mail" )
		{
			showListContent();
		}
		else if ( $.urlParam('view') === "community" )
		{
			showCommunityContent();
		}
		else if ( $.urlParam('view') === "powered" )
		{
			showPoweredByContent();
		}
	}
}

$(function(){
	buildRepoContent();
	buildRepoListContent();
	buildRepoMailingListContent();
	buildCommunityTable();
	buildPoweredByContent();

	$(window).resize(function(){
	      hideBalloon();
          resizeRepoContent();
		  resizeCommunityContent();
		  resizePoweredByContent();
	});
	resizeRepoContent();
	setStats();
	
	$('#year').text(new Date().getFullYear());
	window.setInterval("adjustBalloon()", 500);
	$('#balloon-container').hover(function(){
		shouldBeShowingBalloonIndex = showingBalloonIndex;
	},function(){
		shouldBeShowingBalloonIndex = -1;
	});
	
	handleViewParameter();
});
