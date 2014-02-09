var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function PunchList(project_id, project_name, client_name) {
	
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
	
	
	
	var data = [];
	var status = ['All','Draft', 'Issued', 'Acknowledged', 'Pending', 'Completed', 'Archived'];
	var status_index = 0;
	var self = Ti.UI.createWindow({
		backgroundColor : '#EEEEEE',
		width : width,
		height : height,
		title : 'Punch List'
	});

	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : self
	});
	var b = Titanium.UI.createButton({
		title : "Project Home"
	});
	self.leftNavButton = b;
	b.addEventListener('click', function() {
		var ProjectHome = require('ui/handheld/ProjectHome');
		var projectHome = ProjectHome(project_id, project_name, client_name);
		projectHome.right = width;
		projectHome.open(slide_right);
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	var r = Titanium.UI.createButton({
		title : "New List"
	});
	self.rightNavButton = r;
	r.addEventListener('click',function(){
		var NewPunchList = require('ui/handheld/NewPunchList');
		var newPunchList = NewPunchList(project_id, project_name, client_name);
		newPunchList.left = width;
		newPunchList.open(slide_left);
		//showMessageTimeout('Loading project home');
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	win1.add(nav);
	var project_title_lbl = Ti.UI.createLabel({
		top:33,
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
	self.add(project_title_lbl);
	var status_lbl = Ti.UI.createLabel({
		top : 63,
		height : 31,
		left : 4,
		width : 46,
		font : {
			fontSize : 14
		},
		text : 'Status: ',
	});
	self.add(status_lbl);
	var status_selection = Ti.UI.createView({
		top : 63,
		height : 31,
		left : 50,
		width : 150,
		borderWidth : 3,
		borderRadius : 12,
		borderColor : 'white'
	});
	var status_label = Ti.UI.createLabel({
		top : 6,
		left : 9,
		color : '#375513',
		font : {
			fontSize : 14
		},
		width : 165,
		text : 'All',
	});

	var drop_down = Ti.UI.createImageView({
		image : '/images/green_down_arrow.png',
		height : 11,
		width : 11,
		top : 10,
		right : 10,
	});
	
	status_selection.add(status_label);
	status_selection.add(drop_down);

	var opts = {
		//cancel: 0,
		options : status,

		title : 'Status'
	};
	var dialog = Ti.UI.createOptionDialog(opts);
	status_selection.addEventListener('click', function() {
		dialog.show();
	});
	dialog.addEventListener('click', function(e) {
		if(e.index != null && e.index >= 0){
			status_label.text = ' ' + status[e.index];
			loadStatusPunch(status[e.index]);	
		}
		
	});
	self.add(status_selection);
	punchs_tbl = Ti.UI.createTableView({
		top : 95,
		bottom : 0,
		left : 0,
		right : 0,
		backgroundColor : 'white'
	});
	loadStatusPunch(status[0]);
	function loadStatusPunch(status) {
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetPunchLists';
		if(status == 'All'){
			status = '';
		}
		var Data = {
			"UserId" : Titanium.App.Properties.getString('userId'),
			"ProjectId" : project_id,
			"Status" : status
		};
		punchs_tbl.add(loader);
		loader.show();
		xhr.open('POST', url);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.send(JSON.stringify(Data));
		xhr.onerror = function() {
			loader.hide();
			//alert(JSON.stringify(this));
		}
		xhr.onload = function() {
			//alert(this.responseText);
			loader.hide();
			if (this.status == 200) {
				var response = JSON.parse(this.responseText);
				data = [];
				var colors = ['white', '#EEEEEE'];
				var row = Titanium.UI.createTableViewRow({
					id : -1,
					pl_title : -1,
					backgroundColor : '#8DACC5'
				});
				
				var title_title = Titanium.UI.createLabel({
					top : 5,
					left : width/64,
					width : width/3,
					text : 'Title',
					font : {
						fontSize : 13
					}
				});
				var title_bic = Titanium.UI.createLabel({
					top : 7,
					left : width/2.90,
					width : width/3.2,
					text : 'Ball In Court',
					font : {
						fontSize : 13
					}
				});
				var title_status = Titanium.UI.createLabel({
					top : 7,
					left : width/1.52,
					width : width/2.90,
					text : "Status",
					font : {
						fontSize : 13
					}
				});
				row.add(title_title);
				row.add(title_bic);
				row.add(title_status);
				data.push(row);
				
				var user_id = Titanium.App.Properties.getString("userId");
				
				for (var i = 0; i < response.length; i++) {
					var row = Titanium.UI.createTableViewRow({
						id : response[i].PLID,
						pl_title : response[i].PLTitle,
						PLNumber : response[i].PLNumber,
						backgroundColor : colors[i % 2],
						height:height/8
					});
					var title_title = Titanium.UI.createLabel({
						top : height/28,
						left : width/64,
						width : width/3,
						text : response[i].PLNumber + '-' + response[i].PLTitle,
						font : {
							fontSize : 13
							
						}
					});
					var title_bic = Titanium.UI.createLabel({
						top : height/28,
						left : width/2.90,
						width : width/3.2,
						text : response[i].PLBallInCourt,
						font : {
							fontSize : 13
						}
					});
					var title_status = Titanium.UI.createLabel({
						top : height/28,
						left : width/1.52,
						width : width/2.90,
						text : response[i].PLStatus,
						font : {
							fontSize : 13
						}
					});
					row.add(title_title);
					row.add(title_bic);
					row.add(title_status);
					row.addEventListener('click', function(e) {

						//setTimeout(function() {
							var PunchListDetail = require('ui/handheld/PunchListDetail');
							var punchListDetail = PunchListDetail(project_id, project_name, client_name,e.row.id,e.row.PLNumber,e.row.pl_title);
							punchListDetail.left = width;
							punchListDetail.open(slide_left);
							self.close();
							self = null;
							win1.close();
							win1 = null;
						//}, 100);

					});
					//alert(user_id.toString() != response[i].PLFrom.toString())
					if(response[i].PLStatus == "Draft" && user_id.toString() != response[i].PLFrom.toString()){
						Ti.API.info( response[i].PLStatus + "  -----  " + user_id + "  -----  " + response[i].EnteredBY + response[i].PLFrom );
					}else{ 
						data.push(row);
					}
					
				}
				punchs_tbl.data = data;
			}

		}
	}


	self.add(punchs_tbl)
	return win1;
}

module.exports = PunchList;
