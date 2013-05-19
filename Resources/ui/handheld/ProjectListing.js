var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function ProjectListing() {
	//load component dependencies
	
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
	
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'grey',
		width:width,
		height:height,
		title:'Projects'
	});
	
	var win1 = Titanium.UI.createWindow();
	var nav = Titanium.UI.iPhone.createNavigationGroup({
	   window: self
	});
	var b = Titanium.UI.createButton({title:'Logout'});
	self.leftNavButton = b;
	b.addEventListener('click',function(){
		Titanium.App.Properties.setString('userId',null);
		showMessageTimeout("Logout successfull");
		win1.close();
		win1 = null;
		var Window;
		Window = require('ui/handheld/LoginWindow');
	
		var loginWindow = new Window()
		
		loginWindow.open();
	});
	win1.add(nav);
	
	
	var projects_tbl;
	
	
	
	projects_tbl = Ti.UI.createTableView({
		top:30,
		bottom:0,
		left:0,
		right:0,
		backgroundColor:'white'
	});
	projects_tbl.add(loader);
	loader.show();
	var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetProjects';
	var Data = {"UserId":Titanium.App.Properties.getString('userId')};
	xhr.open('POST',url);
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify(Data));
	xhr.onerror = function(){
		loader.hide();
		alert(JSON.stringify(this));
		
	}
	xhr.onload = function(){
		loader.hide();
		if(this.status == 200){
			var response = JSON.parse(this.responseText);
			var data = [];
			var colors = ['white','#EEEEEE'];
			for(var i=0;i<response.length;i++){
				var row = Titanium.UI.createTableViewRow({
					id:response[i].ProjectId,
					name:response[i].ProjectName,
					client:response[i].ClientName,
					backgroundColor:colors[i%2],
					height:height/8,
				});
				var title_l = Titanium.UI.createLabel({
					top:height/23,
					left:10,
					text:response[i].ProjectName,
					font:{
						fontSize:18
					}
				});
				var title_r = Titanium.UI.createLabel({
					top:height/23,
					right:10,
					text:'['+ response[i].ClientName+']',
					font:{fontSize:18}
				});
				row.add(title_l);
				//row.add(title_r);

				row.addEventListener('click',function(e){
					/*var userName = "fahad";
					var pass= "fahad";
					var my_auth = make_basic_auth(userName,pass);
					//var url = "http://192.168.2.100:3000/users.json";
					var url = "http://innovativespinning.appspot.com/service/interval/category/cors";
					xhr.open("GET",url);
					xhr.setRequestHeader('Authorization',my_auth);
					xhr.setRequestHeader('Content-Type','application/json');
					xhr.setRequestHeader('Accept','application/json');
					xhr.send();
					xhr.onload = function(){
						alert("on load");
						alert(JSON.stringify(this));
					}
					xhr.onerror = function(){
						alert("on error");
						alert(JSON.stringify(this));
					}
					return;*/
					setTimeout(function(){
						var ProjectHome = require('ui/handheld/ProjectHome');
						var projectHome = ProjectHome(e.row.id,e.row.name,e.row.client);
						projectHome.left = width;
						projectHome.open(slide_left);
						self.close();
						self = null;
						win1.close();
						win1 = null;
					},100);
				});
				data.push(row);
			}
			projects_tbl.data = data;
			
		}
	}
	
	self.add(projects_tbl);
	return win1;
}
module.exports = ProjectListing;