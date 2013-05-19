var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");


function ProjectHome(project_id,project_name,client_name) {
	//load component dependencies
	//alert(project_name);
	//create component instance
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right=0; 
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
		backgroundColor:'#EEEEEE',
		width:width,
		height:height,
		title:'Project Home'
	});

	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
	   window: self
	});
	var b = Titanium.UI.createButton({title:"Projects"});
	self.leftNavButton = b;
	b.addEventListener('click',function(){
		var ProjectListing = require('ui/handheld/ProjectListing');
		var projectListing = ProjectListing();
		projectListing.right = width;
		projectListing.open(slide_right);
		//showMessageTimeout('Loading your projects');
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	win1.add(nav);

	var project_title_lbl = Ti.UI.createLabel({
		top:30,
		height:30,
		left:0,
		right:0,
		width:width,
		font:{
			fontSize:16,
			fontWeight:'bold'
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text:project_name
	});
	var project_client_lbl = Ti.UI.createLabel({
		top:60,
		height:30,
		left:0,
		right:0,
		width:width,
		font:{fontSize:14},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text:'(' + client_name + ')'
	});
	
	var project_detail_btn = Titanium.UI.createButton({
		top:100,
		left:30,
		right:30,
		title:'Project Detail'
	});
	project_detail_btn.addEventListener('click',function(){
		var ProjectDetail = require('ui/handheld/ProjectDetail');
		var projectDetail = ProjectDetail(project_id,project_name,client_name);
		projectDetail.left = width;
		projectDetail.open(slide_left);
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	
	var project_punch_btn = Titanium.UI.createButton({
		top:150,
		left:30,
		right:30,
		title:'Punch Lists'
	});
	project_punch_btn.addEventListener('click',function(){
		var PunchList = require('ui/handheld/PunchList');
		var punchList = PunchList(project_id,project_name,client_name);
		punchList.left = width;
		punchList.open(slide_left);
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	
	
	self.add(project_client_lbl);
	self.add(project_title_lbl);
	self.add(project_detail_btn);
	self.add(project_punch_btn);
	
	return win1;
}
module.exports = ProjectHome;