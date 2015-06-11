function TabSpec(code, id, text, handler)
{
	this.code = code;
	this.id = id;
	this.text = text;
	this.handler = handler;
}

function PoweredBySpec(name, url, imageUrl, width, height)
{
	this.name = name;
	this.url = url;
	this.image = {};
	this.image.url = imageUrl;
	this.image.width = width;
	this.image.height = height;
}

function OutsideProject(name, netflixName, url, description)
{
	this.name = name;
	this.netflixName = netflixName;
	this.url = url;
	this.description = description;
}

function WebLink(netflixName, text, url)
{
	this.text = text;
	this.url = url;
	this.netflixName = netflixName;
}

var tabs = [
	new TabSpec('repo', 'tab-content-repo', 'Repositories'),
/*	new TabSpec('timeline', 'tab-content-timeline', 'Commit Timeline'), */
/*	new TabSpec('mail', 'tab-content-lists', 'Mailing Lists'), */
/*	new TabSpec('community', 'tab-content-community', 'Community'), */
	new TabSpec('powered', 'tab-content-powered-by', 'Powered By NetflixOSS'),
/*	new TabSpec('web', 'tab-content-web', 'Around the Web'),*/
/*	new TabSpec('amis', 'tab-content-amis', 'AMIs'),  */
];

var poweredBy = [
	new PoweredBySpec("Stitchfix", "https://www.stitchfix.com/", "assets/powered/stitchfix.png"),
	new PoweredBySpec("kenzan", "http://www.kenzanmedia.com/", "assets/powered/kenzan.png"),
	new PoweredBySpec("Schibsted", "http://www.schibsted.com/", "assets/powered/schibsted.png"),
	new PoweredBySpec("Bitnet", "http://bitnet.io/", "assets/powered/bitnet.png"),
	new PoweredBySpec("Rapid7", "http://www.rapid7.com/", "assets/powered/r7logo.png"),
	new PoweredBySpec("Bonobos", "http://bonobos.com/", "assets/powered/bonobos-logo-sm.png"),
	new PoweredBySpec("Knewton", "http://knewton.com/", "assets/powered/knewton.png"),
	new PoweredBySpec("Rainforest", "http://rainforestqa.com/", "assets/powered/rainforest.png"),
	new PoweredBySpec("Waze", "http://waze.com/", "assets/powered/waze.png"),
	new PoweredBySpec("Nirmata", "http://www.nirmata.com/", "assets/powered/nirmata.png"),
	new PoweredBySpec("IBM", "http://www.ibm.com/", "assets/powered/IBM-logo.png"),
	new PoweredBySpec("Vennetics", "http://www.vennetics.com/", "assets/powered/vennetics.png"),
	new PoweredBySpec("Swrve", "http://swrve.com/", "assets/powered/swrve-logo.png"),
	new PoweredBySpec("Kixeye", "https://www.kixeye.com/", "assets/powered/kixeye-logo.png"),
	new PoweredBySpec("Yammer", "https://www.yammer.com/", "assets/powered/yammer-logo.png"),
	new PoweredBySpec("FullContact", "http://www.fullcontact.com/", "assets/powered/fullcontact.png"),
	new PoweredBySpec("FlipKart", "http://www.flipkart.com/", "assets/powered/flipkart.png"),
	new PoweredBySpec("Globus Genomics", "https://www.globus.org/genomics/", "assets/powered/globus-logo.png"),
	new PoweredBySpec("Riot", "http://www.riotgames.com", "assets/powered/riot-logo-sm.png"),
	new PoweredBySpec("Coursera", "https://www.coursera.org", "assets/powered/coursera.png", 225, 45),
	new PoweredBySpec("Yelp", "http://yelp.com", "assets/powered/yelp-sm.png", 150, 79),
	new PoweredBySpec("Hotels", "https://github.com/neilbeveridge/Cloud-Prize/blob/master/Submission.md", "assets/powered/hotels-sm.jpg", 358, 277),
	new PoweredBySpec("Mortar", "https://github.com/mortardata/Cloud-Prize/blob/master/Submission.md", "assets/powered/mortar-sm.png", 200, 56),
	new PoweredBySpec("AWSAnswers", "https://github.com/pas256/Cloud-Prize/blob/master/Submission.md", "assets/powered/aws-answers.jpg", 225, 59),
	new PoweredBySpec("Yahoo", "http://yahoo.com", "assets/powered/yahoo.png", 202, 50),
	new PoweredBySpec("Eucalyptus", "http://www.eucalyptus.com", "assets/powered/eucalyptus2.png", 352, 84),
	new PoweredBySpec("StumbleUpon", "http://www.stumbleupon.com/", "assets/powered/stumbleupon.png", 91, 91),
	new PoweredBySpec("Maginatics", "http://maginatics.com", "assets/powered/maginatics2.png", 137, 91),
	new PoweredBySpec("UserEvents", "http://www.userevents.com", "assets/powered/userevents.png", 310, 65),
	new PoweredBySpec("Bazaarvoice", "http://www.bazaarvoice.com", "assets/powered/bazaarvoice.png", 193, 50),
	new PoweredBySpec("OpenSCG", "http://www.openscg.com", "assets/powered/openscg.png", 242, 54),
	new PoweredBySpec("Suncorp", "http://www.suncorp.com.au/", "assets/powered/suncorp.png", 172, 100)
];

var outsideProjects = [
	new OutsideProject('Flux Capacitor', '', 'https://github.com/cfregly/fluxcapacitor', 'Java-based reference app demonstrating many Netflix Open Source components.'),
	new OutsideProject('Galaxy', 'Curator', 'http://puniverse.github.com/galaxy/about.html', 'A high-performance in-memory data-grid (IMDG) that can serve as a basis for building distributed applications that require fine-tuned control over data placement and/or custom distributed data-structures.'),
	new OutsideProject('Storm', 'Curator', 'https://github.com/nathanmarz/storm', 'A distributed realtime computation system.'),
	new OutsideProject('Apache James Mailbox', 'Curator', 'http://james.apache.org/mailbox/index.html', 'A library providing a flexible Mailbox storage accessible by mail protocols (IMAP4, POP3, SMTP,...) and other protocols.'),
	new OutsideProject('Dubbo', 'Curator', 'http://code.alibabatech.com/wiki/display/dubbo/Home', 'A distributed service framework empowers applications with service import/export capability with high performance RPC.'),
	new OutsideProject('Palomino Benchpress', 'Curator', 'https://github.com/palominolabs/benchpress', 'Distributed load testing tool.'),
	new OutsideProject('Druid', 'Curator', 'https://github.com/metamx/druid', 'Metamarkets Druid Data Store.'),
	new OutsideProject('Chef-ZooKeeper', 'Exhibitor', 'https://github.com/SimpleFinance/chef-zookeeper', 'Installs and configures ZooKeeper and Exhibitor.'),
	new OutsideProject('ZCache', 'Curator', 'https://github.com/NiceSystems/zcache', 'A simple cache implementation on top of ZooKeeper.'),
	new OutsideProject('Titan Graph Database', 'Astyanax', 'https://github.com/thinkaurelius/titan', 'A highly scalable graph database optimized for storing and querying large graphs with billions of vertices and edges distributed across a multi-machine cluster.'),
	new OutsideProject('Bazaarvoice Curator Extensions', 'Curator', 'https://github.com/bazaarvoice/curator-extensions', 'Helpers that extend the functionality of Curator.'),
	new OutsideProject('Ostrich', 'Curator', 'http://www.github.com/bazaarvoice/ostrich', 'Bazaarvoice\'s service oriented architecture library that is built on top of Curator and ZooKeeper.'),
	new OutsideProject('Dropwizard-Extra', 'Curator', 'https://github.com/datasift/dropwizard-extra', 'A set of miscellaneous and common Dropwizard utilities.'),
	new OutsideProject('exhibitor-deb-builder', 'Exhibitor', 'https://github.com/qubitdigital/exhibitor-deb-builder', 'A build script to create deb package of Exhibitor.')
];

var webLinks = [
	new WebLink('NetflixOSS', 'Paul Guth: Netflix teaches everyone how to host a tech meetup', 'http://constructolution.wordpress.com/2013/02/06/netflix-teaches-everyone-how-to-host-a-tech-meetup/'),
	new WebLink('NetflixOSS', 'Cloud Ecosystem: Making Cloud Apps the Netflix Way', 'http://www.cloudecosystem.com/author.asp?section_id=2810&doc_id=258653'),
	new WebLink('NetflixOSS', 'GigaOM: Netflix to developers: More monkeys to come', 'http://gigaom.com/2013/02/06/netflix-open-house-draws-a-big-developer-crowd/'),
	new WebLink('NetflixOSS', 'TechCrunch: Netflix Gives A Hollywood Look To Open Source Center On GitHub', 'http://techcrunch.com/2012/11/13/netflix-gives-a-hollywood-look-to-open-source-center-on-github/'),
	new WebLink('NetflixOSS', 'TechCrunch: Netflix Promises To Make Its Open Source Cloud Management Tools More Portable', 'http://techcrunch.com/2013/02/06/netflix-more-portable-open-source-cloud-platform/'),

	new WebLink('Asgard', 'Amazon Web Services Blog: New From Netflix - Asgard for Cloud Management and Deployment', 'http://aws.typepad.com/aws/2012/06/new-from-netflix-asgard-for-cloud-management-and-deployment.html'),
	new WebLink('Asgard', 'PCWorld: Netflix Releases Customized Amazon Control Console', 'http://www.pcworld.com/businesscenter/article/258344/netflix_releases_customized_amazon_control_console.html'),
	new WebLink('Asgard', 'GigaOM: Netflix open sources Asgard cloud deployment smarts', 'http://gigaom.com/cloud/netflix-open-sources-asgard-cloud-deployment-smarts/'),
	new WebLink('Asgard', 'Real User Monitoring Blog: Netflix Offers More Open Source Goodness with Asgard Cloud Deployment Tool', 'http://www.real-user-monitoring.com/netflix-offers-more-open-source-goodness-with-asgard-cloud-deployment-tool/'),
	new WebLink('Asgard', 'Data Center Knowledge: Netflix releases Asgard to open source', 'http://www.datacenterknowledge.com/archives/2012/06/26/cloud-news-fujitsu-eucalyptus-netflix-oracle/'),
	new WebLink('Asgard', 'MSPNews: Netflix Launches Asgard Open Source Cloud Control for Amazon', 'http://expertsupportnj.com/2012/06/netflix-launches-asgard-open-source-cloud-control-for-amazon/'),
	new WebLink('Asgard', 'SlideShare: Intro to "Asgard"', 'http://www.slideshare.net/pritiman/intro-to-asgard'),
	new WebLink('Asgard', 'TechClaw: Deploying Smart Cloud Applications', 'http://techclaw.com/deploying-smart-cloud-applications.html'),
	new WebLink('Asgard', 'DevOpsAngle: Netflix Brings Cluster, Application Management to Amazon Web Services with Asgard Open Source Tool', 'http://devopsangle.com/2012/06/25/netflix-brings-cluster-application-management-to-amazon-web-services-with-asgard-open-source-tool/'),
	new WebLink('Asgard', 'Adcloud: TechTalk #5 - Asgard and the AWS Cloud', 'http://dev.adcloud.com/blog/2013/02/27/asgard/'),

	new WebLink('Astyanax', 'Brian ONeill\'s Blog: Compound/Composite Keys: Connecting the dots between CQL3, Astyanax and Hector', 'http://brianoneill.blogspot.com/2012/09/composite-keys-connecting-dots-between.html'),
	new WebLink('Astyanax', 'DZone: CQL, Astyanax and Compound/Composite Keys: Writing Data', 'http://java.dzone.com/articles/cql-astyanax-and'),

	new WebLink('SimianArmy', 'Forbes: Netflix Releases Free Infrastructure Failure Testing Software "Chaos Monkey" To Public', 'http://www.forbes.com/sites/reuvencohen/2012/07/30/netflix-releases-free-infrastructure-failure-testing-software-chaos-monkey-to-public/'),
	new WebLink('SimianArmy', 'Coding Horror: Working with the Chaos Monkey', 'http://www.codinghorror.com/blog/2011/04/working-with-the-chaos-monkey.html'),
	new WebLink('SimianArmy', 'Ars Technica: Netflix attacks own network with "Chaos Monkey"---and now you can too', 'http://arstechnica.com/information-technology/2012/07/netflix-attacks-own-network-with-chaos-monkey-and-now-you-can-too/'),
	new WebLink('SimianArmy', 'IT World:Open source Chaos Monkey brings order to cloud', 'http://www.itworld.com/cloud-computing/288039/open-source-chaos-monkey-brings-order-cloud'),
	new WebLink('SimianArmy', 'Information Week: Netflix Wants You To Adopt Chaos Monkey', 'http://www.informationweek.com/smb/security/netflix-wants-you-to-adopt-chaos-monkey/240004829'),
	new WebLink('SimianArmy', 'Network World: Netflix uncages Chaos Monkey disaster testing system', 'http://www.networkworld.com/news/2012/073012-chaos-monkey-261279.html'),
	new WebLink('SimianArmy', 'GigaOM: Netflix open sources cloud-testing Chaos Monkey', 'http://gigaom.com/cloud/netflix-open-sources-cloud-testing-chaos-monkey/'),
	new WebLink('SimianArmy', 'TechCrunch: Netflix Open Sources Chaos Monkey -- A Tool Designed To Cause Failure So You Can Make A Stronger Cloud', 'http://techcrunch.com/2012/07/30/netflix-open-sources-chaos-monkey-a-tool-designed-to-cause-failure-so-you-can-make-a-stronger-cloud/'),
	new WebLink('SimianArmy', 'The Verge:Netflix releases "Chaos Monkey" code to help developers defend against outages', 'http://www.theverge.com/2012/7/30/3205402/netflix-chaos-monkey-code-developers-amazon-web-services'),
	new WebLink('SimianArmy', 'Tech News World: Netflix Releases Chaos Monkey Into the Wild', 'http://www.technewsworld.com/story/75780.html'),
	new WebLink('SimianArmy', 'Read Write Web: Chaos Monkey: How Netflix Uses Random Failure to Ensure Success', 'http://www.readwriteweb.com/cloud/2010/12/chaos-monkey-how-netflix-uses.php'),
	new WebLink('SimianArmy', 'InfoQ: Netflix Unleashes Chaos Monkey as its Latest Open Source Tool', 'http://www.infoq.com/news/2012/07/chaos-monkey'),
	new WebLink('SimianArmy', 'Gigaom: Netflix open sources tool to clean up your AWS cloud', 'http://gigaom.com/cloud/netflix-open-sources-tool-to-clean-up-your-aws-cloud/'),
	new WebLink('SimianArmy', 'The Web Hosting Industry Review: Netflix Open Sources Janitor Monkey Tool that Cleans Up Unused AWS Cloud Resources', 'http://www.thewhir.com/web-hosting-news/netflix-open-sources-janitor-monkey-tool-that-cleans-up-unused-aws-cloud-resources'),
	new WebLink('SimianArmy', 'Network World: Netflix open sources Janitor Monkey to help tidy up unused Amazon cloud resources', 'http://www.networkworld.com/news/2013/010413-janitor-monkey-netflix-265504.html'),
	new WebLink('SimianArmy', 'DatacenterDynamics:Netflix makes cloud Janitor Monkey open source', 'http://www.datacenterdynamics.com/focus/archive/2013/01/netflix-makes-cloud-janitor-monkey-open-source'),

	new WebLink('Curator', 'Netflix Curator for Zookeeper', 'http://www.youtube.com/watch?v=8e9bnaPw5RI'),
	new WebLink('Curator', 'Introduction to ZooKeeper -- TriHUG May 22, 2012', 'http://www.slideshare.net/mumrah/introduction-to-zookeeper-trihug-may-22-2012'),
	new WebLink('Curator', 'Configuring the Cluster Component', 'http://puniverse.github.com/galaxy/manual/config/config-cluster.html'),
	new WebLink('Curator', 'Using Netflix Curator for Service Discovery', 'http://blog.palominolabs.com/2012/08/14/using-netflix-curator-for-service-discovery/'),
	new WebLink('Curator', 'Stay in sync with Apache Zookeeper', 'http://funnel.hasgeek.com/rootconf/338-stay-in-sync-with-apache-zookeeper'),
	new WebLink('Curator', 'Lesson in Distributed Computing with Apache ZooKeeper (German)', 'http://www.java-forum-stuttgart.de/jfs/2012/folien/A6.pdf'),
	new WebLink('Curator', 'Dataweek Keynote: Large Scale Search, Discovery and Analysis in Action (Slides 23/24)', 'http://www.slideshare.net/iprovalo/data-week-lucidworks'),
	new WebLink('Curator', 'Hadoop: The Definitive Guide - 3rd Edition (page 522)', 'http://www.amazon.com/Hadoop-Definitive-Guide-Tom-White/dp/1449311520/ref=pd_sim_b_1'),
	new WebLink('Curator', 'Curator Framework: Reducing the Complexity of Building Distributed Systems', 'http://www.optify.net/marketing-technology/curator-framework-reducing-the-complexity-of-building-distributed-systems'),
	new WebLink('Curator', 'Leader Electon, Curator and Embedded ZK', 'https://dl.dropbox.com/u/7540961/zk_leader_election.pdf'),
	new WebLink('Curator', 'Zookeeper, Netflix Curator and ACLs', 'http://michaelmorello.blogspot.com/2012/12/zookeeper-netflix-curator-and-acls.html'),
	new WebLink('Curator', 'Adventures in Clustering -- part 1', 'http://sourcedelica.com/blog/2013/01/adventures-in-clustering-part-1/'),
	new WebLink('Curator', 'Software Developer\'s Journal - Hadoop Issue', 'http://sdjournal.org/apache-hadoop-ecosystem/'),

	new WebLink('Eureka', 'GigaOM: Netflix open-sources Eureka to fill gap in Amazon’s cloud', 'http://gigaom.com/2012/09/04/netflix-open-sources-eureka-to-fill-gap-in-amazons-cloud/'),
	new WebLink('Eureka', "ZDNet: Netflix hopes to inspire better AWS load balancing with 'Eureka'", 'http://www.zdnet.com/netflix-hopes-to-inspire-better-aws-load-balancing-with-eureka-7000003835/'),
	new WebLink('Eureka', 'ArsTechnica: Eureka! Netflix makes Amazon more reliable with open source software', 'http://arstechnica.com/information-technology/2012/09/eureka-netflix-makes-amazon-more-reliable-with-open-source-software/'),
	new WebLink('Eureka', 'The Next Web: Netflix reveals Eureka, an open source REST-based service that helps it prepare for AWS outages', 'http://thenextweb.com/dd/2012/09/04/netflix-reveals-eureka-open-source-rest-based-service-helps-prepare-aws-outages/'),
	new WebLink('Eureka', 'Tech Well: Netflix Has a Eureka Moment', 'http://www.techwell.com/2012/09/netflix-has-eureka-moment'),
	new WebLink('Eureka', 'DZone: Netflix Open Sources Cloud Service Registry and Cloud Load Balancer', 'http://architects.dzone.com/articles/netflix-open-sources-cloud'),

	new WebLink('Exhibitor', 'Web Pro News: Netflix Introduces Exhibitor, A Supervisor System For ZooKeeper', 'http://www.webpronews.com/netflix-introduces-exhibitor-a-supervisor-system-for-zookeeper-2012-04'),
	new WebLink('Exhibitor', 'Setting up a ZooKeeper Quorum on Amazon EC2 with Exhibitor', 'http://pulasthisupun.blogspot.com/2012/08/setting-up-zookeeper-quorum-on-amazon.html'),
	new WebLink('Exhibitor', 'Software Developer\'s Journal - Hadoop Issue', 'http://sdjournal.org/apache-hadoop-ecosystem/'),

	new WebLink('Blitz4J', 'Netflix Log4J Optimizations Yield Logging at Massive Scale', 'http://www.infoq.com/news/2012/12/bitz4j-netflix'),

	new WebLink('Hystrix', 'Gigaom: Netflix Open Sources Tool for Making Cloud Services Play Nice', 'http://gigaom.com/cloud/netflix-open-sources-tool-for-making-cloud-services-play-nice/'),
	new WebLink('Hystrix', 'TechCrunch: Netflix Releases Hystrix, A Service For Making Apps in the Cloud More Resilient', 'http://techcrunch.com/2012/11/26/netflix-releases-hystrix-a-service-for-making-apps-in-the-cloud-more-resilient/'),
	new WebLink('Hystrix', 'SlashDot: Netflix Gives Data Center Tools to Fail', 'http://slashdot.org/topic/datacenter/netflix-gives-data-center-tools-to-fail/'),
	new WebLink('Hystrix', 'ZDNet: Netflix Open Sources Resiliency Tools for Distributed Services', 'http://www.zdnet.com/netflix-open-sources-resiliency-tools-for-distributed-services-7000007963/'),
	new WebLink('Hystrix', 'ProgrammableWeb: Today In APIs: Netflix Hystrix...', 'http://blog.programmableweb.com/2012/11/27/today-in-apis-netflix-hystrix-zeit-api-and-23-new-apis/'),
	new WebLink('Hystrix', 'H-Online: Netflix Open Sources Hystrix Resiliency Library', 'http://www.h-online.com/open/news/item/Netflix-open-sources-Hystrix-resilience-library-1757427.html'),
	new WebLink('Hystrix', 'The Web Hosting Industry Review: New Netflix Open Source Technology Hystrix Improves Cloud Resiliency, Uptime', 'http://www.thewhir.com/web-hosting-news/new-netflix-open-source-technology-hystrix-improves-cloud-resiliency-uptime'),
	new WebLink('Hystrix', 'World TV/PC: Netflix in Hystrix With New Open Source Safeguard Service', 'http://www.worldtvpc.com/blog/netflix-in-hysterix-with-new-open-source-safeguard-service/'),
	new WebLink('Hystrix', 'Netflix open-sources Hystrix to boost global cloud performance and stability', 'http://www.extremetech.com/internet/141594-netflix-open-sources-hystrix-to-boost-global-cloud-performance-and-stability'),
	new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems', 'http://www.infoq.com/news/2012/12/netflix-hystrix-fault-tolerance'),
	new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems (InfoQ China)', 'http://www.infoq.com/cn/news/2013/01/netflix-hystrix-fault-tolerance'),
	new WebLink('Hystrix', 'InfoQ: Netflix Hystrix - Latency and Fault Tolerance for Complex Distributed Systems (InfoQ Japan)', 'http://www.infoq.com/jp/news/2012/12/netflix-hystrix-fault-tolerance')
];

