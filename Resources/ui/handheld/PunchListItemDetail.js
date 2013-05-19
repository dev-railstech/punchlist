var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,sts,e_by,a_by) {
	//alert(ItemId);
	var item_detail=null;
	var loader = Ti.UI.createActivityIndicator({
		  color: '#8DACC5',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  height:'auto',
		  width:'auto',
		  message:'Loading'
	});
	
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right= 0; 
	slide_right.duration = 400;
	var self = Ti.UI.createWindow({
		backgroundColor : '#EEEEEE',
		width : width,
		height : height,
		title : PLTitle
	});
	//alert(ItemId);
	var action_url = '';
	var action_params = {};
	
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
	var r = Titanium.UI.createButton({
		title : "Edit"
	});
	
	
	l.addEventListener('click', function() { 
		var PunchListDetail = require('ui/handheld/PunchListDetail');
		var punchListDetail = PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle);
		punchListDetail.right = width;
		punchListDetail.open(slide_right);
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	
	
	
	
	win1.add(nav);



	//self.add(barView(130,8,width-16));
	var number_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:30,
		height:20,
		text: 'Item Number:',
		font: {
			fontSize:12
		}
	});
	var number_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:30,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var room_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:50,
		height:20,
		text: 'Room:',
		font: {
			fontSize:12
		}
	});
	var room_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:50,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	
	
	var location_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:70,
		height:20,
		text: 'Location:',
		font: {
			fontSize:12
		}
	});
	var location_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:70,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	var discipline_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:90,
		height:20,
		text: 'Discipline:',
		font: {
			fontSize:12
		}
	});
	var discipline_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:90,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	
	var to_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:110,
		height:20,
		text: 'To:',
		font: {
			fontSize:12
		}
	});
	var to_lbl_val = Ti.UI.createLabel({
		left:142,
		width:'auto',
		top:110,
		height:20,
		text: 'xxxx',
		font: {
			fontSize:12
		}
	});
	
	
	
	
	
	
	
	var description_lbl = Ti.UI.createLabel({
		left:12,
		width:130,
		top:140,
		height:20,
		text: 'Description:',
		font: {
			fontSize:12
		}
	});
	var description_wv= Titanium.UI.createWebView({
		top:164,
		//backgroundColor:'#eeeeee',
		left:10,
		right:10,
		height:100,
		html:'',
		font:{fontSize:12}
	});
	
	var pl_complete_lbl = Ti.UI.createLabel({
		top:274,
		height:20,
		left:12,
		width:130,
		text:'Completed:',
		font : {
			fontSize : 12
		},
	});
	var pl_complete = Ti.UI.createLabel({
		top:274,
		height:25,
		left:142,
		width:30,
		text:"xxxx",
		font: {
			fontSize:12
		}
	});
	
	var complete_flag = null;
	
	var complete_action = Ti.UI.createButton({
		right:30,
		width:width - 220,
		title:"Action",
		borderRadius:7,
		top:270
	});
	
	complete_action.addEventListener("click",function(){
		if(complete_flag == 0){
			//open popup with two text fields
			var win2 = Ti.UI.createWindow({
				left:0,
				right:0,
				top:0,
				bottom:0,
				
			});
			var opacity_view = Titanium.UI.createView({
				width : '100%',
				height : '100%',
				backgroundColor : 'black',
				opacity : 0.6
			});
			win2.add(opacity_view);
			var vw = Ti.UI.createView({
				left:30,
				right:30,
				top:50,
				bottom:60,
				backgroundColor:"#EEEEEE",
				borderRadius:7,
				borderColor:'#8DACC5',
				borderWidth:4
			});
			var completion_label = Ti.UI.createLabel({
				left:0,
				width:'100%',
				top:20,
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
				text:"Completion Note"
			});
			vw.add(completion_label);
			var completion_field = Ti.UI.createTextArea({
				top:50,
				left:10,
				right:10,
				height:100
			});
			vw.add(completion_field);
			var old_completion_field = Ti.UI.createWebView({
				top:160,
				left:10,
				right:10,
				height:100,
				html:item_detail[0].CompletionNotes
			});
			vw.add(old_completion_field);
			var submit_btn = Ti.UI.createButton({
				left:60,
				right:60,
				top:290,
				height:25,
				borderRadius:7,
				title:"Submit"
			});
			vw.add(submit_btn);
			submit_btn.addEventListener("click",function(){
				vw.add(loader);
				loader.show();
				var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/PLItemEdit';
				//alert(JSON.stringify(item_detail));
				//should must add itemid here and pass that to web service
				var notes = completion_field.value;
				var PostData = {
					"PLID": PLID,
					"ItemId": ItemId,
					"Complete":"Y",
					"CompletionNotes":notes,
					"FileName":"photo.png",
					"ImageFile":item_image.toImage(),
					"ActionBy":item_detail[0].ActionBy,
					"Room":item_detail[0].Room,
					"Location":item_detail[0].Location,
					"Discipline":item_detail[0].Discipline,
					"Description":item_detail[0].Description
				};
				//alert("Hello " + JSON.stringify(PostData));
				xhr.open('POST',url);
				xhr.setRequestHeader('content-type','application/json');
				xhr.send(PostData);
				xhr.onerror = function(){
					loader.hide();
					alert(JSON.stringify(this));
				}
				xhr.onload = function(){	
					loader.hide();
					if(this.status == 200){
						item_id = this.responseText;
						var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
						var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,item_id,sts,e_by);
						PunchListItemDetail.left = width;
						punchListItemDetail.open(slide_left);
						showMessageTimeout("Item Successfully Updated");
						self.close();
						self = null;
						win2.close();
						win2 = null;
			
					}
				}
			});
			win2.add(vw);
			win2.open();
			
			opacity_view.addEventListener("click",function(){
				win2.close();
			})
		}
		if(complete_flag == 1){
			
			
			
			
			
			
			var win2 = Ti.UI.createWindow({
				left:0,
				right:0,
				top:0,
				bottom:0,
				
			});
			var opacity_view = Titanium.UI.createView({
				width : '100%',
				height : '100%',
				backgroundColor : 'black',
				opacity : 0.6
			});
			win2.add(opacity_view);
			var vw = Ti.UI.createView({
				left:30,
				right:30,
				top:50,
				bottom:60,
				backgroundColor:"#EEEEEE",
				borderRadius:7,
				borderColor:'#8DACC5',
				borderWidth:4
			});
			var completion_label = Ti.UI.createLabel({
				left:0,
				width:'100%',
				top:20,
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
				text:"Completion Note"
			});
			vw.add(completion_label);
			var completion_field = Ti.UI.createTextArea({
				top:50,
				left:10,
				right:10,
				height:100
			});
			vw.add(completion_field);
			var old_completion_field = Ti.UI.createWebView({
				top:160,
				left:10,
				right:10,
				height:100,
				html:item_detail[0].CompletionNotes
			});
			vw.add(old_completion_field);
			var submit_btn = Ti.UI.createButton({
				left:60,
				right:60,
				top:290,
				height:25,
				borderRadius:7,
				title:"Submit"
			});
			vw.add(submit_btn);
			submit_btn.addEventListener("click",function(){
				vw.add(loader);
				loader.show();
				var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/PLItemEdit';
				//alert(JSON.stringify(item_detail));
				//should must add itemid here and pass that to web service
				var notes = completion_field.value;
				var PostData = {
					"PLID": PLID,
					"ItemId": ItemId,
					"Complete":"N",
					"CompletionNotes":notes,
					"FileName":"photo.png",
					"ImageFile":item_image.toImage(),
					"ActionBy":item_detail[0].ActionBy,
					"Room":item_detail[0].Room,
					"Location":item_detail[0].Location,
					"Discipline":item_detail[0].Discipline,
					"Description":item_detail[0].Description
				};
				//alert("Hello " + JSON.stringify(PostData));
				xhr.open('POST',url);
				xhr.setRequestHeader('content-type','application/json');
				xhr.send(PostData);
				xhr.onerror = function(){
					loader.hide();
					alert(JSON.stringify(this));
				}
				xhr.onload = function(){	
					loader.hide();
					if(this.status == 200){
						item_id = this.responseText;
						var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
						var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,item_id,sts,e_by);
						PunchListItemDetail.left = width;
						punchListItemDetail.open(slide_left);
						showMessageTimeout("Item Successfully Updated");
						self.close();
						self = null;
						win2.close();
						win2 = null;
			
					}
				}
			});
			win2.add(vw);
			win2.open();
			
			opacity_view.addEventListener("click",function(){
				win2.close();
			})
			
			
			
			
			
			
		}
		
	});
	
	var pl_note_lbl = Ti.UI.createLabel({
		top:300,
		height:20,
		left:12,
		width:130,
		text:'Completion Note:',
		font : {
			fontSize : 12
		},
	});
	var pl_note = Ti.UI.createWebView({
		top:310,
		height:100,
		left:142,
		width:width-155,
		html:"xxxx"
	});
	
	
	
	
	
	
	self.add(pl_note_lbl);
	self.add(pl_complete_lbl);
	self.add(to_lbl);
	
	self.add(discipline_lbl);
	self.add(location_lbl);
	self.add(room_lbl);
	self.add(number_lbl);
	self.add(description_lbl);
	
	self.add(pl_complete);
	
	self.add(pl_note);
	
	
	var item_image = Titanium.UI.createImageView({
		top:420,
		left:(width/2)-120,
		width:240
		//title:'View Item Image'
	});
	
	
	self.add(item_image);
	self.add(to_lbl_val);
	
	self.add(discipline_lbl_val);
	self.add(location_lbl_val);
	self.add(room_lbl_val);
	self.add(number_lbl_val);
	self.add(description_wv);
	
	//self.add(barView(240,8,width-16));
	



	self.add(loader);
	loader.show();
	var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetPunchListItem';
	var Data = {
		"UserId" : Titanium.App.Properties.getString('userId'),
		"ItemId" : ItemId
	};
	//alert(JSON.stringify(Data));
	xhr.open('POST', url);
	xhr.setRequestHeader("content-type", "application/json");
	xhr.send(JSON.stringify(Data));
	xhr.onerror = function() {
		loader.hide();
		alert("error: " + JSON.stringify(this));
	}
	xhr.onload = function() {
		loader.hide();
		if (this.status == 200) {
			var response = JSON.parse(this.responseText);
			item_detail = response;
			
			if(a_by == Ti.App.Properties.getString("userId") && response[0].Complete == "N"){
				complete_action.title = "Complete";
				complete_flag = 0;
				self.add(complete_action);
			}
			
			if(e_by == Ti.App.Properties.getString("userId") && response[0].Complete == "Y"){
				complete_action.title = "Incomplete";
				complete_flag = 1;
				self.add(complete_action);
			}
			
			if(e_by == Titanium.App.Properties.getString('userId') && sts == 'Draft'){
			  self.rightNavButton = r;
		    }
		    
		    var image_url = response[0].ItemImage;
			for(var i=0;i<image_url.length;i++){
				image_url = image_url.replace(' ','%20');
			}
			r.addEventListener('click', function(e) {
				var EditPunchListItem = require('ui/handheld/EditPunchListItem');
				var editPunchListItem = EditPunchListItem(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,response[0].ItemTo,response[0].Discipline,response[0].Location,response[0].Room,response[0].Description,response[0].ItemNumber,image_url,response[0].Complete,response[0].CompletionNotes,sts,e_by,a_by);
				editPunchListItem.left = width;
				editPunchListItem.open(slide_left);
				self.close();
				self = null;
				win1.close();
				win1 = null;
			});
			
			to_lbl_val.text = response[0].ItemTo;
			discipline_lbl_val.text = response[0].Discipline;
			location_lbl_val.text =  response[0].Location;
			room_lbl_val.text = response[0].Room;
			description_wv.html = response[0].Description;
			number_lbl_val.text = response[0].ItemNumber;
			pl_complete.text = response[0].Complete;
			pl_note.html = response[0].CompletionNotes;
			
			item_image.image = image_url;
			item_image.addEventListener("click",function(){
				var PunchListItemImage = require('ui/handheld/PunchListItemImage');
				var punchListItemImage = PunchListItemImage(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,sts,e_by,image_url);
				punchListItemImage.left = width;
				punchListItemImage.open(slide_left);
				self.close();
				self = null;
				win1.close();
				win1 = null;	
		   });
			
		}
	}
	
	
	return win1;
}

module.exports = PunchListItemDetail; 