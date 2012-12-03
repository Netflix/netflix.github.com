var ignoreRepos = {
    'netflix.github.com': true,
    'aws-autoscaling': true
};
var showingBalloonIndex = -1;
var shouldBeShowingBalloonIndex = -1;

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

    var thisRepo = reposTab[index];
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
}

function showRepoContent()
{
    $('#tab-content-lists').hide();
    $('#tab-content-timeline').hide();
    $('#tab-content-repo').show();
    resizeRepoContent();
}

function showTimelineContent() {
    $('#tab-content-repo').hide();
    $('#tab-content-lists').hide();
    $('#tab-content-timeline').show();
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

function resizeRepoContent()
{
    $('#repo-content').css({'height':(($(window).height())-320)+'px'});
    $('#repo-list-content').css({'height':(($(window).height())-320)+'px'});
}

function buildRepoContent()
{
    var imageUrl, imageFileName, boxArtOverride, i;
    var projectsToBoxArtOverrides = {
        'astyanax': 'Sci-Fi-and-Fantasy.jpg',
        'archaius': 'Anime-and-Animation.jpg',
        'asgard': 'Family-Animation.jpg',
        'blitz4j': 'Boxing.jpg',
        'CassJMeter': 'Comedy.jpg',
        'curator': 'Documentary.jpg',
        'edda': 'Classics.jpg',
        'eureka': 'Action-Adventure.jpg',
        'exhibitor': 'Drama.jpg',
        'frigga': 'Music-and-Musicals.jpg',
        'Hystrix': 'Thrillers.jpg',
        'governator': 'Crime-Action.jpg',
        'Priam': 'Romantic-Comedies.jpg',
        'servo': 'Animal-Tales.jpg',
        'SimianArmy': 'Mobster.jpg'
    };
    var repoContent = "";
    var boxArtIndex = 0;
    for (i = 0; i < reposTab.length; ++i )
    {
        var thisRepo = reposTab[i];
        if ( !thisRepo.private && !ignoreRepos[thisRepo.name] )
        {
            boxArtOverride = projectsToBoxArtOverrides[thisRepo.name];
            if (boxArtOverride) {
                imageFileName = boxArtOverride;
            } else {
                imageFileName = 'box-art-' + boxArtIndex + '.jpg'
                boxArtIndex++;
                if (boxArtIndex > 20) {
                    boxArtIndex = 0;
                }
            }
            imageUrl = 'assets/' + imageFileName;

            repoContent += '<a class="repo-item-anchor" href="' + thisRepo.html_url + '">';
            repoContent += '<div class="repo-item-container">';
            repoContent += '<div id="repo-container-id-' + i + '" class="repo-item-name">' + thisRepo.name + '</div>';
            repoContent += '<div id="repo-id-' + i + '" class="repo-item" style="background-image: url(' + imageUrl + ')">';
                repoContent += '<div id="repo-cover-id-' + i + '" class="repo-item-cover"><div class="repo-item-shadow"></div></div>';
                repoContent += '<div id="repo-button-id-' + i + '" class="repo-item-button"></div>';
            repoContent += '</div></a>';
            repoContent += '</div>';
        }
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
        var thisRepo = reposTab[i];
        if ( !thisRepo.private && !ignoreRepos[thisRepo.name] )
        {
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
    }

    $('#repo-list-content').html(repoListContent);
}

$(function(){
    buildRepoContent();
    buildRepoListContent();

    $(window).resize(function(){
          hideBalloon();
          resizeRepoContent();
    });
    resizeRepoContent();

    window.setInterval("adjustBalloon()", 500);
    $('#balloon-container').hover(function(){
        shouldBeShowingBalloonIndex = showingBalloonIndex;
    },function(){
        shouldBeShowingBalloonIndex = -1;
    });
});
