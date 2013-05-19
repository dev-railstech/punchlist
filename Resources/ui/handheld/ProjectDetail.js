var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function ProjectDetail(project_id,project_name,client_name) {
	//load component dependencies
	//alert(project_name);
	//create component instance
	
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right =0; 
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
		title:'Project Detail'
	});

	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
	   window: self
	});
	var b = Titanium.UI.createButton({title:"Home"});
	self.leftNavButton = b;
	b.addEventListener('click',function(){
		var ProjectHome = require('ui/handheld/ProjectHome');
		var projectHome = ProjectHome(project_id,project_name,client_name);
		ProjectHome.right = width;
		projectHome.open(slide_right);
		//showMessageTimeout('Loading project home');
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	win1.add(nav);
	
	self.add(loader);
	loader.show();
	var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetProject';
	var Data = {"UserId":Titanium.App.Properties.getString('userId'),"ProjectId":project_id};
	xhr.open('POST',url);
	xhr.setRequestHeader("content-type","application/json");
	xhr.send(JSON.stringify(Data));
	xhr.onerror = function(){
		loader.hide();
		//alert(JSON.stringify(this));
	}
	xhr.onload = function(){
		loader.hide();
		if(this.status == 200){
			var response = JSON.parse(this.responseText);
			//alert(JSON.stringify(response));
			var project_title_lbl = Ti.UI.createLabel({
				top:30,
				height:30,
				left:10,
				font:{fontSize:14},
				text:'Project Name: '+response[0].ProjectName
			});
			var project_client_lbl = Ti.UI.createLabel({
				top:60,
				height:30,
				left:10,
				font:{fontSize:14},
				text:'Client Name: ' + response[0].ClientName
			});
			var project_text_wv = Titanium.UI.createWebView({
				top:90,
				//backgroundColor:'#eeeeee',
				left:0,
				right:0,
				bottom:0,
				html:response[0].ProjectText?response[0].ProjectText:'not available',
				font:{fontSize:12}
			});
			self.add(project_title_lbl);
			self.add(project_client_lbl);
			self.add(project_text_wv);
		}
		
		
		
	}
	

	return win1;
}
module.exports = ProjectDetail;