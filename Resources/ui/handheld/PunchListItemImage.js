var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function PunchListItemImage(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,sts,e_by,image_url) {
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right = 0; 
	slide_right.duration = 400;
	
	var loader = Ti.UI.createActivityIndicator({
		  color: '#8DACC5',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  height:'auto',
		  width:'auto',
		  message:'Loading'
	});
	
	var self = Ti.UI.createWindow({
		backgroundColor : '#EEEEEE',
		width : width,
		height : height,
		title : PLTitle
	});
	
	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : self
	});
	var l = Titanium.UI.createButton({
		title : "Back"
	});
	self.leftNavButton = l;

	l.addEventListener('click', function() { 
		var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
		var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,sts,e_by);
		punchListItemDetail.right = width;
		punchListItemDetail.open(slide_right);
		//showMessageTimeout('Loading.......');
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	win1.add(nav);
	
	//alert(image_url);
	//image_url = 'http://images3.wikia.nocookie.net/__cb20100520131748/logopedia/images/5/5c/Google_logo.png';
	var image_view = Ti.UI.createImageView({
		top:50,
		left:10,
		right:10,
		width:width-20,
		//backgroundColor:'yellow'
		image:image_url
	});
	
	self.add(image_view)
	return win1;
}
module.exports = PunchListItemImage;
