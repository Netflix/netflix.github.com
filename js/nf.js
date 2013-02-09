var showingBalloonIndex = -1;
var shouldBeShowingBalloonIndex = -1;

function TabSpec(code, id, text)
{
	this.code = code;
	this.id = id;
	this.text = text;
}

var TAB_CODE_REPOS = "repo";
var TAB_CODE_TIMELINE = "timeline";
var TAB_CODE_MAILING_LISTS = "mail";
var TAB_CODE_COMMUNITY = "community";
var TAB_CODE_POWERED_BY = "powered";
var TAB_CODE_WEB = "web";

var tabs = [
	new TabSpec(TAB_CODE_REPOS, "tab-content-repo", "Repositories"),
	new TabSpec(TAB_CODE_TIMELINE, "tab-content-timeline", "Commit Timeline"),
	new TabSpec(TAB_CODE_MAILING_LISTS, "tab-content-lists", "Mailing Lists"),
	new TabSpec(TAB_CODE_COMMUNITY, "tab-content-community", "Community"),
	new TabSpec(TAB_CODE_POWERED_BY, "tab-content-powered-by", "Powered By NetflixOSS"),
	new TabSpec(TAB_CODE_WEB, "tab-content-web", "Around the Web")
];

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

function showTab(which)
{
	var showId = null;
	for ( var i = 0; i < tabs.length; ++i )
	{
		if ( tabs[i].code === which )
		{
			showId = tabs[i].id;
			break;
		}
	}
	
	if ( showId )
	{
		for ( var i = 0; i < tabs.length; ++i )
		{
			if ( tabs[i].id === showId )
			{
				$('#' + tabs[i].id).show();
			}
			else
			{
				$('#' + tabs[i].id).hide();
			}
		}
		doResizing();
	}
	else
	{
		showTab(TAB_CODE_REPOS);
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

function PoweredBySpec(name, netflixNames, url, imageUrl, width, height)
{
	this.name = name;
	this.netflixNames = netflixNames;
	this.url = url;
	this.image = {};
	this.image.url = imageUrl;
	this.image.width = width;
	this.image.height = height;
}

function buildPoweredByContent()
{
	var poweredBy = new Array();
	poweredBy.push(new PoweredBySpec("Maginatics", "Curator", "http://maginatics.com/", "assets/powered/maginatics.png", 210, 140));
	poweredBy.push(new PoweredBySpec("UserEvents", "Curator", "http://www.userevents.com/", "assets/powered/userevents.png", 310, 65));
	poweredBy.push(new PoweredBySpec("Bazaarvoice", "Curator", "http://www.bazaarvoice.com/", "assets/powered/bazaarvoice.png", 193, 50));
	poweredBy.push(new PoweredBySpec("OpenSCG", "Curator", "http://www.openscg.com/", "assets/powered/openscg.png", 242, 54));

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

function OutsideProject(name, netflixName, url, description)
{
	this.name = name;
	this.netflixName = netflixName;
	this.url = url;
	this.description = description;
}

function buildCommunityTable()
{
	var outsideProjects = new Array();
	outsideProjects.push(new OutsideProject('Flux Capacitor', '', 'https://github.com/cfregly/fluxcapacitor', 'Java-based reference app demonstrating many Netflix Open Source components.'));
	
	outsideProjects.push(new OutsideProject('Galaxy', 'Curator', 'http://puniverse.github.com/galaxy/about.html', 'A high-performance in-memory data-grid (IMDG) that can serve as a basis for building distributed applications that require fine-tuned control over data placement and/or custom distributed data-structures.'));
	outsideProjects.push(new OutsideProject('Storm', 'Curator', 'https://github.com/nathanmarz/storm', 'A distributed realtime computation system.'));
	outsideProjects.push(new OutsideProject('Apache James Mailbox', 'Curator', 'http://james.apache.org/mailbox/index.html', 'A library providing a flexible Mailbox storage accessible by mail protocols (IMAP4, POP3, SMTP,...) and other protocols.'));
	outsideProjects.push(new OutsideProject('Dubbo', 'Curator', 'http://code.alibabatech.com/wiki/display/dubbo/Home', 'A distributed service framework empowers applications with service import/export capability with high performance RPC.'));
	outsideProjects.push(new OutsideProject('Palomino Benchpress', 'Curator', 'https://github.com/palominolabs/benchpress', 'Distributed load testing tool.'));
	outsideProjects.push(new OutsideProject('Druid', 'Curator', 'https://github.com/metamx/druid', 'Metamarkets Druid Data Store.'));
	outsideProjects.push(new OutsideProject('Chef-ZooKeeper', 'Exhibitor', 'https://github.com/SimpleFinance/chef-zookeeper', 'Installs and configures ZooKeeper and Exhibitor.'));
	outsideProjects.push(new OutsideProject('ZCache', 'Curator', 'https://github.com/NiceSystems/zcache', 'A simple cache implementation on top of ZooKeeper.'));
	outsideProjects.push(new OutsideProject('Titan Graph Database', 'Astyanax', 'https://github.com/thinkaurelius/titan', 'A highly scalable graph database optimized for storing and querying large graphs with billions of vertices and edges distributed across a multi-machine cluster.'));
	outsideProjects.push(new OutsideProject('Bazaarvoice Curator Extensions', 'Curator', 'https://github.com/bazaarvoice/curator-extensions', 'Helpers that extend the functionality of Curator.'));
	outsideProjects.push(new OutsideProject('Ostrich', 'Curator', 'http://www.github.com/bazaarvoice/ostrich', 'Bazaarvoice\'s service oriented architecture library that is built on top of Curator and ZooKeeper.'));
		
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

function WebLink(netflixName, text, url)
{
	this.text = text;
	this.url = url;
	this.netflixName = netflixName;
}

function buildAroundTheWeb()
{
	var webLinks = new Array();

	webLinks.push(new WebLink('Asgard', 'Amazon Web Services Blog: New From Netflix - Asgard for Cloud Management and Deployment', 'http://aws.typepad.com/aws/2012/06/new-from-netflix-asgard-for-cloud-management-and-deployment.html'));
	webLinks.push(new WebLink('Asgard', 'PCWorld: Netflix Releases Customized Amazon Control Console', 'http://www.pcworld.com/businesscenter/article/258344/netflix_releases_customized_amazon_control_console.html'));
	webLinks.push(new WebLink('Asgard', 'GigaOM: Netflix open sources Asgard cloud deployment smarts', 'http://gigaom.com/cloud/netflix-open-sources-asgard-cloud-deployment-smarts/'));
	webLinks.push(new WebLink('Asgard', 'Real User Monitoring Blog: Netflix Offers More Open Source Goodness with Asgard Cloud Deployment Tool', 'http://www.real-user-monitoring.com/netflix-offers-more-open-source-goodness-with-asgard-cloud-deployment-tool/'));
	webLinks.push(new WebLink('Asgard', 'Data Center Knowledge: Netflix releases Asgard to open source', 'http://www.datacenterknowledge.com/archives/2012/06/26/cloud-news-fujitsu-eucalyptus-netflix-oracle/'));
	webLinks.push(new WebLink('Asgard', 'MSPNews: Netflix Launches Asgard Open Source Cloud Control for Amazon', 'http://expertsupportnj.com/2012/06/netflix-launches-asgard-open-source-cloud-control-for-amazon/'));
	webLinks.push(new WebLink('Asgard', 'SlideShare: Intro to "Asgard"', 'http://www.slideshare.net/pritiman/intro-to-asgard'));
	webLinks.push(new WebLink('Asgard', 'TechClaw: Deploying Smart Cloud Applications', 'http://techclaw.com/deploying-smart-cloud-applications.html'));
	webLinks.push(new WebLink('Asgard', 'DevOpsAngle: Netflix Brings Cluster, Application Management to Amazon Web Services with Asgard Open Source Tool', 'http://devopsangle.com/2012/06/25/netflix-brings-cluster-application-management-to-amazon-web-services-with-asgard-open-source-tool/'));
	webLinks.push(new WebLink('Asgard', 'Adcloud: TechTalk #5 - Asgard and the AWS Cloud', 'http://dev.adcloud.com/blog/2013/02/27/asgard/'));

	webLinks.push(new WebLink('Astyanax', 'Brian ONeill\'s Blog: Compound/Composite Keys: Connecting the dots between CQL3, Astyanax and Hector', 'http://brianoneill.blogspot.com/2012/09/composite-keys-connecting-dots-between.html'));
	webLinks.push(new WebLink('Astyanax', 'DZone: CQL, Astyanax and Compound/Composite Keys: Writing Data', 'http://java.dzone.com/articles/cql-astyanax-and'));

	webLinks.push(new WebLink('SimianArmy', 'Forbes: Netflix Releases Free Infrastructure Failure Testing Software "Chaos Monkey" To Public', 'http://www.forbes.com/sites/reuvencohen/2012/07/30/netflix-releases-free-infrastructure-failure-testing-software-chaos-monkey-to-public/'));
	webLinks.push(new WebLink('SimianArmy', 'Coding Horror: Working with the Chaos Monkey', 'http://www.codinghorror.com/blog/2011/04/working-with-the-chaos-monkey.html'));
	webLinks.push(new WebLink('SimianArmy', 'Ars Technica: Netflix attacks own network with "Chaos Monkey"---and now you can too', 'http://arstechnica.com/information-technology/2012/07/netflix-attacks-own-network-with-chaos-monkey-and-now-you-can-too/'));
	webLinks.push(new WebLink('SimianArmy', 'IT World:Open source Chaos Monkey brings order to cloud', 'http://www.itworld.com/cloud-computing/288039/open-source-chaos-monkey-brings-order-cloud'));
	webLinks.push(new WebLink('SimianArmy', 'Information Week: Netflix Wants You To Adopt Chaos Monkey', 'http://www.informationweek.com/smb/security/netflix-wants-you-to-adopt-chaos-monkey/240004829'));
	webLinks.push(new WebLink('SimianArmy', 'Network World: Netflix uncages Chaos Monkey disaster testing system', 'http://www.networkworld.com/news/2012/073012-chaos-monkey-261279.html'));
	webLinks.push(new WebLink('SimianArmy', 'GigaOM: Netflix open sources cloud-testing Chaos Monkey', 'http://gigaom.com/cloud/netflix-open-sources-cloud-testing-chaos-monkey/'));
	webLinks.push(new WebLink('SimianArmy', 'TechCrunch: Netflix Open Sources Chaos Monkey -- A Tool Designed To Cause Failure So You Can Make A Stronger Cloud', 'http://techcrunch.com/2012/07/30/netflix-open-sources-chaos-monkey-a-tool-designed-to-cause-failure-so-you-can-make-a-stronger-cloud/'));
	webLinks.push(new WebLink('SimianArmy', 'The Verge:Netflix releases "Chaos Monkey" code to help developers defend against outages', 'http://www.theverge.com/2012/7/30/3205402/netflix-chaos-monkey-code-developers-amazon-web-services'));
	webLinks.push(new WebLink('SimianArmy', 'Tech News World: Netflix Releases Chaos Monkey Into the Wild', 'http://www.technewsworld.com/story/75780.html'));
	webLinks.push(new WebLink('SimianArmy', 'Read Write Web: Chaos Monkey: How Netflix Uses Random Failure to Ensure Success', 'http://www.readwriteweb.com/cloud/2010/12/chaos-monkey-how-netflix-uses.php'));
	webLinks.push(new WebLink('SimianArmy', 'InfoQ: Netflix Unleashes Chaos Monkey as its Latest Open Source Tool', 'http://www.infoq.com/news/2012/07/chaos-monkey'));
	webLinks.push(new WebLink('SimianArmy', 'Gigaom: Netflix open sources tool to clean up your AWS cloud', 'http://gigaom.com/cloud/netflix-open-sources-tool-to-clean-up-your-aws-cloud/'));
	webLinks.push(new WebLink('SimianArmy', 'The Web Hosting Industry Review: Netflix Open Sources Janitor Monkey Tool that Cleans Up Unused AWS Cloud Resources', 'http://www.thewhir.com/web-hosting-news/netflix-open-sources-janitor-monkey-tool-that-cleans-up-unused-aws-cloud-resources'));
	webLinks.push(new WebLink('SimianArmy', 'Network World: Netflix open sources Janitor Monkey to help tidy up unused Amazon cloud resources', 'http://www.networkworld.com/news/2013/010413-janitor-monkey-netflix-265504.html'));
	webLinks.push(new WebLink('SimianArmy', 'DatacenterDynamics:Netflix makes cloud Janitor Monkey open source', 'http://www.datacenterdynamics.com/focus/archive/2013/01/netflix-makes-cloud-janitor-monkey-open-source'));
	
	webLinks.push(new WebLink('Curator', 'Netflix Curator for Zookeeper', 'http://www.youtube.com/watch?v=8e9bnaPw5RI'));
	webLinks.push(new WebLink('Curator', 'Introduction to ZooKeeper -- TriHUG May 22, 2012', 'http://www.slideshare.net/mumrah/introduction-to-zookeeper-trihug-may-22-2012'));
	webLinks.push(new WebLink('Curator', 'Configuring the Cluster Component', 'http://puniverse.github.com/galaxy/manual/config/config-cluster.html'));
	webLinks.push(new WebLink('Curator', 'Using Netflix Curator for Service Discovery', 'http://blog.palominolabs.com/2012/08/14/using-netflix-curator-for-service-discovery/'));
	webLinks.push(new WebLink('Curator', 'Stay in sync with Apache Zookeeper', 'http://funnel.hasgeek.com/rootconf/338-stay-in-sync-with-apache-zookeeper'));
	webLinks.push(new WebLink('Curator', 'Lesson in Distributed Computing with Apache ZooKeeper (German)', 'http://www.java-forum-stuttgart.de/jfs/2012/folien/A6.pdf'));
	webLinks.push(new WebLink('Curator', 'Dataweek Keynote: Large Scale Search, Discovery and Analysis in Action (Slides 23/24)', 'http://www.slideshare.net/iprovalo/data-week-lucidworks'));
	webLinks.push(new WebLink('Curator', 'Hadoop: The Definitive Guide - 3rd Edition (page 522)', 'http://www.amazon.com/Hadoop-Definitive-Guide-Tom-White/dp/1449311520/ref=pd_sim_b_1'));
	webLinks.push(new WebLink('Curator', 'Curator Framework: Reducing the Complexity of Building Distributed Systems', 'http://www.optify.net/marketing-technology/curator-framework-reducing-the-complexity-of-building-distributed-systems'));
	webLinks.push(new WebLink('Curator', 'Leader Electon, Curator and Embedded ZK', 'https://dl.dropbox.com/u/7540961/zk_leader_election.pdf'));
	webLinks.push(new WebLink('Curator', 'Zookeeper, Netflix Curator and ACLs', 'http://michaelmorello.blogspot.com/2012/12/zookeeper-netflix-curator-and-acls.html'));
	webLinks.push(new WebLink('Curator', 'Adventures in Clustering -- part 1', 'http://sourcedelica.com/blog/2013/01/adventures-in-clustering-part-1/'));
	webLinks.push(new WebLink('Curator', 'Software Developer\'s Journal - Hadoop Issue', 'http://sdjournal.org/apache-hadoop-ecosystem/'));

	webLinks.push(new WebLink('Eureka', 'GigaOM: Netflix open-sources Eureka to fill gap in Amazon’s cloud', 'http://gigaom.com/2012/09/04/netflix-open-sources-eureka-to-fill-gap-in-amazons-cloud/'));
	webLinks.push(new WebLink('Eureka', "ZDNet: Netflix hopes to inspire better AWS load balancing with 'Eureka'", 'http://www.zdnet.com/netflix-hopes-to-inspire-better-aws-load-balancing-with-eureka-7000003835/'));
	webLinks.push(new WebLink('Eureka', 'ArsTechnica: Eureka! Netflix makes Amazon more reliable with open source software', 'http://arstechnica.com/information-technology/2012/09/eureka-netflix-makes-amazon-more-reliable-with-open-source-software/'));
	webLinks.push(new WebLink('Eureka', 'The Next Web: Netflix reveals Eureka, an open source REST-based service that helps it prepare for AWS outages', 'http://thenextweb.com/dd/2012/09/04/netflix-reveals-eureka-open-source-rest-based-service-helps-prepare-aws-outages/'));
	webLinks.push(new WebLink('Eureka', 'Tech Well: Netflix Has a Eureka Moment', 'http://www.techwell.com/2012/09/netflix-has-eureka-moment'));
	webLinks.push(new WebLink('Eureka', 'DZone: Netflix Open Sources Cloud Service Registry and Cloud Load Balancer', 'http://architects.dzone.com/articles/netflix-open-sources-cloud'));

    webLinks.push(new WebLink('Exhibitor', 'Web Pro News: Netflix Introduces Exhibitor, A Supervisor System For ZooKeeper', 'http://www.webpronews.com/netflix-introduces-exhibitor-a-supervisor-system-for-zookeeper-2012-04'));
	webLinks.push(new WebLink('Exhibitor', 'Setting up a ZooKeeper Quorum on Amazon EC2 with Exhibitor', 'http://pulasthisupun.blogspot.com/2012/08/setting-up-zookeeper-quorum-on-amazon.html'));
	webLinks.push(new WebLink('Exhibitor', 'Software Developer\'s Journal - Hadoop Issue', 'http://sdjournal.org/apache-hadoop-ecosystem/'));

	webLinks.push(new WebLink('Blitz4J', 'Netflix Log4J Optimizations Yield Logging at Massive Scale', 'http://www.infoq.com/news/2012/12/bitz4j-netflix'));

	webLinks.push(new WebLink('Hystrix', 'Gigaom: Netflix Open Sources Tool for Making Cloud Services Play Nice', 'http://gigaom.com/cloud/netflix-open-sources-tool-for-making-cloud-services-play-nice/'));
	webLinks.push(new WebLink('Hystrix', 'TechCrunch: Netflix Releases Hystrix, A Service For Making Apps in the Cloud More Resilient', 'http://techcrunch.com/2012/11/26/netflix-releases-hystrix-a-service-for-making-apps-in-the-cloud-more-resilient/'));
	webLinks.push(new WebLink('Hystrix', 'SlashDot: Netflix Gives Data Center Tools to Fail', 'http://slashdot.org/topic/datacenter/netflix-gives-data-center-tools-to-fail/'));
	webLinks.push(new WebLink('Hystrix', 'ZDNet: Netflix Open Sources Resiliency Tools for Distributed Services', 'http://www.zdnet.com/netflix-open-sources-resiliency-tools-for-distributed-services-7000007963/'));
	webLinks.push(new WebLink('Hystrix', 'ProgrammableWeb: Today In APIs: Netflix Hystrix...', 'http://blog.programmableweb.com/2012/11/27/today-in-apis-netflix-hystrix-zeit-api-and-23-new-apis/'));
	webLinks.push(new WebLink('Hystrix', 'H-Online: Netflix Open Sources Hystrix Resiliency Library', 'http://www.h-online.com/open/news/item/Netflix-open-sources-Hystrix-resilience-library-1757427.html'));
	webLinks.push(new WebLink('Hystrix', 'The Web Hosting Industry Review: New Netflix Open Source Technology Hystrix Improves Cloud Resiliency, Uptime', 'http://www.thewhir.com/web-hosting-news/new-netflix-open-source-technology-hystrix-improves-cloud-resiliency-uptime'));
	webLinks.push(new WebLink('Hystrix', 'World TV/PC: Netflix in Hystrix With New Open Source Safeguard Service', 'http://www.worldtvpc.com/blog/netflix-in-hysterix-with-new-open-source-safeguard-service/'));
	webLinks.push(new WebLink('Hystrix', 'Netflix open-sources Hystrix to boost global cloud performance and stability', 'http://www.extremetech.com/internet/141594-netflix-open-sources-hystrix-to-boost-global-cloud-performance-and-stability'));
	webLinks.push(new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems', 'http://www.infoq.com/news/2012/12/netflix-hystrix-fault-tolerance'));
	webLinks.push(new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems (InfoQ China)', 'http://www.infoq.com/cn/news/2013/01/netflix-hystrix-fault-tolerance'));
	webLinks.push(new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems (InfoQ Japan)', 'http://www.infoq.com/jp/news/2012/12/netflix-hystrix-fault-tolerance'));
	
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

function doResizing()
{
	resizeRepoContent();
	resizeCommunityContent();
	resizePoweredByContent();
	resizeWebContent();
}

function resizeWebContent()
{
	$('#web-table-content').css({'height':(($(window).height())-330)+'px'});
}

function resizePoweredByContent()
{
	$('#content-powered-by').css({'height':(($(window).height())-350)+'px'});
}

function resizeCommunityContent()
{
	$('#community-table-content').css({'height':(($(window).height())-330)+'px'});
}

function resizeRepoContent()
{
	$('#repo-content').css({'height':(($(window).height())-320)+'px'});
	$('#repo-list-content').css({'height':(($(window).height())-320)+'px'});
}

function buildTabs()
{
	var content = "";
	for ( var i = 0; i < tabs.length; ++i )
	{
		content += '<a href="#" onClick="showTab(\'' + tabs[i].code + '\'); return false;">';
		content += '<div class="sub-header-item">' + tabs[i].text + '</div>';
		content += '</a>';
	}
	
	$('#sub-header').html(content);
}

$(function(){
	buildTabs();
	buildRepoContent();
	buildRepoListContent();
	buildRepoMailingListContent();
	buildCommunityTable();
	buildPoweredByContent();
	buildAroundTheWeb();

	$(window).resize(function(){
	    hideBalloon();
		doResizing();
	});
	setStats();
	
	$('#year').text(new Date().getFullYear());
	window.setInterval("adjustBalloon()", 500);
	$('#balloon-container').hover(function(){
		shouldBeShowingBalloonIndex = showingBalloonIndex;
	},function(){
		shouldBeShowingBalloonIndex = -1;
	});
	
	showTab($.urlParam('view'));
});
