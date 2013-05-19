var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");


function PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle) {
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right= 0; 
	slide_right.duration = 400;
	
	var open_items = 0;
	var total_items = 0;
	var list_entered_by = null;
	var list_action_by = null;
		
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
		title : PLNumber
	});
	var action_url = '';
	var action_params = {};
	var colors = ['white','#EEEEEE'];
	var color_index = 0;
	
	var e_by = null;
	var sts = null;
	
	
	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : self
	});
	var l = Titanium.UI.createButton({
		title : "Punch Lists"
	});
	self.leftNavButton = l;
	var r = Titanium.UI.createButton({
		title : "Edit"
	});
	//self.rightNavButton = r;
	l.addEventListener('click', function() {
		var PunchList = require('ui/handheld/PunchList');
		var punchList = PunchList(project_id, project_name, client_name);
		punchList.right = width;
		punchList.open(slide_right);
		//showMessageTimeout('Loading.....');
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
	var PL_number_lbl = Ti.UI.createLabel({
		top:63,
		height:30,
		//left:0,
		right:width/2+8,
		width:width/2,
		font:{
			fontSize:14,
			fontWeight:'bold'
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text:PLNumber
	});
	var PL_name_lbl = Ti.UI.createLabel({
		top:63,
		height:30,
		left:width/2+8,
		//right:0,
		width:width/2,
		font:{
			fontSize:14,
			fontWeight:'bold'
		},
		//textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text:PLTitle
	});
	
	var action_btn = Ti.UI.createButton({
		left:8,
		width:200,
		top:96,
		height:30,
		title: 'action'
	});
	
	
	self.add(project_title_lbl);
	self.add(PL_name_lbl);
	self.add(PL_number_lbl);
	
	self.add(barView(130,8,width-16));
	
	
	var date_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:140,
		height:20,
		text: 'Date:',
		font: {
			fontSize:12
		}
	});
	var from_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:160,
		height:20,
		text: 'From:',
		font: {
			fontSize:12
		}
	});
	var to_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:180,
		height:20,
		text: 'To:',
		font: {
			fontSize:12
		}
	});
	var status_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:200,
		height:20,
		text: 'Status:',
		font: {
			fontSize:12
		}
	});
	var visit_date_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:220,
		height:20,
		text: 'Site Visit Date:',
		font: {
			fontSize:12
		}
	});
	
	var visit_issue_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:240,
		height:20,
		text: 'Issue Name:',
		font: {
			fontSize:12
		}
	});
	
	self.add(date_lbl);
	self.add(from_lbl);
	self.add(to_lbl);
	self.add(status_lbl);
	self.add(visit_date_lbl);
	self.add(visit_issue_lbl);
	
	var date_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:140,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var from_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:160,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var to_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:180,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var status_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:200,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var visit_date_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:220,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var visit_issue_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:240,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	
	
	self.add(date_lbl_val);
	self.add(from_lbl_val);
	self.add(to_lbl_val);
	self.add(status_lbl_val);
	self.add(visit_date_lbl_val);
	self.add(visit_issue_lbl_val);
	
	self.add(barView(260,8,width-16));
	
	var items_lbl = Ti.UI.createLabel({
		left:10,
		width:200,
		top:265,
		height:20,
		text:"Punch List Items"
	});
	self.add(items_lbl);
	
	var create_item = Ti.UI.createButton({
		right:10,
		width:120,
		top:265,
		height:20,
		title:"Create new"
	});
	
	
	
	self.add(barView(288,8,width-16));
	var items_filter_bar = Ti.UI.createTabbedBar({
		left:20,
		right:20,
		labels:['All','Completed','Open'],
		style:Ti.UI.iPhone.SystemButtonStyle.BAR,
		top:292,
		index:0,
		height:20
	});
	self.add(items_filter_bar);
	items_filter_bar.addEventListener("click",function(e){
		if(e.index == 0){
			getPunchItems();
		}else if(e.index == 1){
			getPunchItemsFiltered("Y");
		}else if(e.index == 2){
			getPunchItemsFiltered("N");
		}
	});
	var self_table = Ti.UI.createTableView({
		top:315,
		left:0,
		right:0,
		width:width,
		bottom:20,
		backgroundColor:'white'
	});
	
	self.add(self_table);
	
	function getPunchItems(){
		//alert("get punch items")
		var item_data = [];
		
		var tvr = Ti.UI.createTableViewRow({
			backgroundColor:"#8DACC5"
		});
		var item_number_lbl = Ti.UI.createLabel({
			top:8,
			left: width/62,
			text:"#"
		});
		
		var item_room_lbl = Ti.UI.createLabel({
			top:8,
			left:width/12.8,
			text:"Room"
		});
		
		var item_description_lbl = Ti.UI.createLabel({
			top:8,
			left:width/4.2,
			text:"Description"
		});
		
		var item_location_lbl = Ti.UI.createLabel({
			top:8,
			left:width/4.2,
			text:"Location"
		});
		var item_discipline_lbl = Ti.UI.createLabel({
			top:8,
			left:width/2.2,
			text:"Discipline"
		});
		tvr.add(item_number_lbl);
		tvr.add(item_room_lbl);
		tvr.add(item_description_lbl);
		//tvr.add(item_location_lbl);
		//tvr.add(item_discipline_lbl);
		item_data.push(tvr);
		//self_table.data = item_data;
		punchItems("Y",false);

		function punchItems(completed,flag){
			self_table.add(loader);
			loader.show();
			var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetPunchListItems';
			var Data = {
				"UserId" : Titanium.App.Properties.getString('userId'),
				"PLID" : PLID.toString(),
				"ProjectId" : project_id,
				"Completed" : completed
			};
			//alert(JSON.stringify(Data));
			xhr.open('POST', url);
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send(JSON.stringify(Data));
			xhr.onerror = function() {
				alert("error: " + JSON.stringify(this));
				loader.hide();
			}
			xhr.onload = function() {
				loader.hide();
				if (this.status == 200) {
					var response = JSON.parse(this.responseText);
					//alert(JSON.stringify(response));
					for(var i=0;i<response.length;i++){
						//alert("a");
						var tvr = Ti.UI.createTableViewRow({
							backgroundColor:colors[color_index++ % 2],
							ItemId:response[i].ItemID
						});
						
						var item_number_lbl = Ti.UI.createLabel({
							top:8,
							left: width/62,
							text:response[i].ItemNumber
						});
						var item_room_lbl = Ti.UI.createLabel({
							top:8,
							left:width/12.8,
							text:response[i].Room
						});
						//alert("c")
						
						var item_description_lbl = Ti.UI.createLabel({
							top:8,
							left:width/4.2,
							text:response[i].Description
						});
						var item_location_lbl = Ti.UI.createLabel({
							top:8,
							left:width/4.2,
							text:response[i].Location
						});
						//alert("d")
						var item_discipline_lbl = Ti.UI.createLabel({
							top:8,
							left:width/2.2,
							text:response[i].Discipline
						});
						//alert("e")
						tvr.add(item_number_lbl);
						tvr.add(item_room_lbl);
						tvr.add(item_description_lbl);
						//tvr.add(item_location_lbl);
						//tvr.add(item_discipline_lbl);
						//alert("f")
						tvr.addEventListener("click",function(e){
							//alert("clicked");
							var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
							var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,e.row.ItemId,sts,e_by,list_action_by);
							punchListItemDetail.left = width;
							punchListItemDetail.open(slide_left);
							//showMessageTimeout('Loading.....');
							self.close();
							self = null;
							win1.close();
							win1 = null;
						})
						//alert("g")
						item_data.push(tvr);
						//alert("h")
					}
					if(flag == false){
						punchItems("N",true);
					}
						self_table.data = item_data;
					
					
				}
			}
		}	
	}

	
	function getPunchItemsFiltered(completed){
		//alert("get punch items")
		var item_data = [];
		var tvr = Ti.UI.createTableViewRow({
			backgroundColor:"#8DACC5"
		});
		var item_number_lbl = Ti.UI.createLabel({
			top:8,
			left: width/62,
			text:"#"
		});
		
		var item_room_lbl = Ti.UI.createLabel({
			top:8,
			left:width/12.8,
			text:"Room"
		});
		var item_description_lbl = Ti.UI.createLabel({
			top:8,
			left:width/4.2,
			text:"Description"
		});
		var item_location_lbl = Ti.UI.createLabel({
			top:8,
			left:width/4.2,
			text:"Location"
		});
		var item_discipline_lbl = Ti.UI.createLabel({
			top:8,
			left:width/2.2,
			text:"Discipline"
		});
		tvr.add(item_number_lbl);
		tvr.add(item_room_lbl);
		tvr.add(item_description_lbl);
		//tvr.add(item_location_lbl);
		//tvr.add(item_discipline_lbl);
		item_data.push(tvr);
		//self_table.data = item_data;
		punchItemsThis(completed);
			
		function punchItemsThis(completed,flag){
			self_table.add(loader);
			loader.show();
		
			var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetPunchListItems';
			var Data = {
				"UserId" : Titanium.App.Properties.getString('userId'),
				"PLID" : PLID.toString(),
				"ProjectId" : project_id,
				"Completed" : completed
			};
			//alert(JSON.stringify(Data));
			xhr.open('POST', url);
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send(JSON.stringify(Data));
			xhr.onerror = function() {
				alert("error: " + JSON.stringify(this));
				loader.hide();
			}
			xhr.onload = function() {
				loader.hide();
				if (this.status == 200) {
					var response = JSON.parse(this.responseText);
					for(var i=0;i<response.length;i++){
						var tvr = Ti.UI.createTableViewRow({
							backgroundColor:colors[color_index++%2],
							ItemId:response[i].ItemID
						});
						var item_number_lbl = Ti.UI.createLabel({
							top:8,
							left: width/62,
							text:response[i].ItemNumber
						});
						var item_room_lbl = Ti.UI.createLabel({
							top:8,
							left:width/12.8,
							text:response[i].Room
						});
						var item_description_lbl = Ti.UI.createLabel({
							top:8,
							left:width/4.2,
							text:response[i].Description
						});
						
						
						tvr.add(item_number_lbl);
						tvr.add(item_room_lbl);
						tvr.add(item_description_lbl);
						//tvr.add(item_location_lbl);
						//tvr.add(item_discipline_lbl);
						tvr.addEventListener("click",function(e){
							//alert("clicked");
							var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
							var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,e.row.ItemId,sts,e_by,list_action_by);
							punchListItemDetail.left = width;
							punchListItemDetail.open(slide_left);
							//showMessageTimeout('Loading.......');
							self.close();
							self = null;
							win1.close();
							win1 = null;
						})		
						item_data.push(tvr);
						//alert("f")
					}
					
					self_table.data = item_data;
					//alert("z")
					
				}
			}
		}	
	}
	
	
	
	
	
	self.add(loader);
	loader.show();
	var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetPunchList';
	var Data = {
		"UserId" : Titanium.App.Properties.getString('userId'),
		"PLID" : PLID.toString()
	};
	xhr.open('POST', url);
	xhr.setRequestHeader("content-type", "application/json");
	xhr.send(JSON.stringify(Data));
	xhr.onerror = function() {
		loader.hide();
		alert("error: " + JSON.stringify(this));
	}
	xhr.onload = function() {
		//alert(this.responseText);
		loader.hide();
		if (this.status == 200) {
			var response = JSON.parse(this.responseText);
			date_lbl_val.text = response[0].PLCreateDate;
			to_lbl_val.text = response[0].PLTo;
			from_lbl_val.text = response[0].PLFrom;
			status_lbl_val.text = response[0].PLStatus;
			visit_date_lbl_val.text = response[0].PLVisitDate;
			visit_issue_lbl_val.text = response[0].IssueName;
			sts = response[0].PLStatus;
		    e_by = response[0].EnteredBy;
		    list_action_by = response[0].ActionBy;
		    open_items = parseInt(response[0].NumItemsOpen);
		    total_items = parseInt(response[0].NumItems);
		    if(e_by ==  Ti.App.Properties.getString("userId") && response[0].PLStatus == "Draft"){
		    	
		    	
		    	self.add(create_item);
	
				create_item.addEventListener("click",function(){
					var NewPunchListItem= require('ui/handheld/NewPunchListItem');
					var newPunchListItem = NewPunchListItem(project_id, project_name, client_name,PLID,PLNumber,PLTitle,sts,e_by);
					newPunchListItem.left = width;
					newPunchListItem.open(slide_left);
					//showMessageTimeout('Loading punch list detail');
					self.close();
					self = null;
					win1.close();
					win1 = null;
				});
		    	
		    	
			    self.rightNavButton = r;
				r.addEventListener('click', function() {
					var EditPunchList = require('ui/handheld/EditPunchList');
					var editPunchList = EditPunchList(project_id, project_name, client_name,response[0].PLID,response[0].IssueId,response[0].ActionBy,response[0].EnteredBy,response[0].PLStatus,response[0].PLVisitDate,PLTitle,PLNumber);
					editPunchList.left = width;
					editPunchList.open(slide_left);
					self.close();
					self = null;
					win1.close();
					win1 = null;
				});
			}
			action_logic(response);
			getPunchItems();
		}

	}
	function action_logic(response){
		
		var status = response[0].PLStatus;
		var entered_by = response[0].EnteredBy;
		
		
	
		var action_by = response[0].ActionBy;
		var user_id = Titanium.App.Properties.getString("userId");
		
		action_params = {
			"ProjectId":project_id,
			"PLID":response[0].PLID,
			"UserId":user_id
		};
		//alert(open_items);
		//alert(total_items)
		var no_open_item = (open_items == 0); //no open item
		//alert("Open Items: " + open_items + "   Action By:" + action_by + "   Entered By:" + entered_by + "   Status:" + status + "   My ID:" +user_id)
		if(entered_by == user_id && status == "Draft"){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_Issue"
			action_btn.title = "Issue";
			self.add(action_btn);
		}else if(action_by == user_id && status == "Issued"){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_Acknowledge"
			
			action_btn.title = "Acknowledge";
			self.add(action_btn);
		}else if(action_by == user_id && status == "Acknowledged" && (no_open_item == true)){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_ListComplete"
			
			action_btn.title = "List Complete";
			self.add(action_btn);
		}else if(entered_by == user_id && status == "Pending Complete" && (no_open_item == false)){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_ReOpen"
			
			action_btn.title = "Re-Open for Review";
			self.add(action_btn);
		}else if(entered_by == user_id && status == "Pending Complete" && (no_open_item == true)){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_Complete"
			
			action_btn.title = "Mark Complete";
			self.add(action_btn);
		}else if(action_by == user_id && status == "Completed"){
			action_url = "https://dev.masterlibrary.com/Service/Mobile.svc/PunchList_Archive"
			
			action_btn.title = "Archive";
			self.add(action_btn);
		}
		
	}
	action_btn.addEventListener("click",function(e){
		self.add(loader);
		loader.show();
		xhr.open('POST', action_url);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.send(JSON.stringify(action_params));
		xhr.onerror = function() {
			alert(JSON.stringify(this));
			loader.hide();
		}
		xhr.onload = function() {
			//alert(this.responseText);
			//reload this page refresh
			loader.hide();
			if (this.status == 200) {
				
				var PunchListDetail = require('ui/handheld/PunchListDetail');
				var punchListDetail = PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle);
				punchListDetail.left = width;
				punchListDetail.open(slide_left);
				self.close();
				self = null;
				win1.close();
				win1 = null;
				showMessageTimeout("Action performed successfully");
				
				
			}
		}
	});
	
		
	
	
	
	return win1;
}

module.exports = PunchListDetail; 