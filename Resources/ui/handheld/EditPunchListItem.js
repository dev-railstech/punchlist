var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(50000);
Ti.include("/ui/common/punchLogic.js");

function EditPunchListItem(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,To,Discipline,Location,Room,Description,ItemNumber,ItemImage,Complete,CompletionNote,sts,e_by,a_by) {
	var self = Ti.UI.createWindow({
		backgroundColor : '#EEEEEE',
		width : width,
		height : height,
		title : 'Edit Item'
	});
	
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right = 0; 
	slide_right.duration = 400;

	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : self
	});
	var loader = Ti.UI.createActivityIndicator({
		  color: '#8DACC5',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  height:'auto',
		  width:'auto',
		  message:'Loading'
	});
	
	
	var item_img;
	
	var cms = ['Yes','No'];
	var cms_ids = ['Y','N'];
	var dialog_cm;
	var selected_cm =Complete;
	
	var opts_cm = {
		//cancel: 0,
		options : cms,

		title : 'Completed'
	};
	dialog_cm = Ti.UI.createOptionDialog(opts_cm);
	dialog_cm.addEventListener('click', function(e) {
		if(e.index != null && e.index >= 0){
			cm_label.text = ' ' + cms[e.index];	
			selected_cm = cms_ids[e.index];
		}
		
	});
	
	
	
	
	var disciplines =['A - Architectural','C - Civil','E - Electrical','LS - Life Safety','M - Mechanical','P - Plumbing','S - Structural','T - Technology'];
	var disciplines_ids = ['A - Architectural','C - Civil','E - Electrical','LS - Life Safety','M - Mechanical','P - Plumbing','S - Structural','T - Technology'];
	var selected_ds= Discipline;
	
	
	var opts_ds = {
		//cancel: 0,
		options : disciplines,

		title : 'Disciplines'
	};
	dialog_ds = Ti.UI.createOptionDialog(opts_ds);
	dialog_ds.addEventListener('click', function(e) {
		if(e.index != null && e.index >= 0){
			ds_label.text = ' ' + disciplines[e.index];	
			selected_ds = disciplines_ids[e.index];
		}
		
	});
	
	
	
	var tos = ['Please select'];
	var tos_ids = [0];
	var dialog_to;
	var selected_to =To;
	
	var opts_to = {
		//cancel: 0,
		options : tos,

		title : 'Action By'
	};
	dialog_to = Ti.UI.createOptionDialog(opts_to);
	dialog_to.addEventListener('click', function(e) {
		if(e.index != null && e.index >= 0){
			to_label.text = ' ' + tos[e.index];	
			selected_to = tos_ids[e.index];
		}
		
	});
	
	
	
	
	//alert(To)
	load_tos();
	function load_tos(){
		self.add(loader);
		loader.show();
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetProjectTeam';
		var Data = {"ProjectId": project_id};
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
				//alert(this.responseText);
				//self.close();
				var response = JSON.parse(this.responseText);
				for(var i=0;i<response.length;i++){
					tos.push(response[i].UserName);
					tos_ids.push(response[i].UserId);
				}
				to_label.text = To; // ' ' + tos[tos_ids.indexOf(To)];
				selected_to = tos_ids[tos.indexOf(To)];
				opts_to = {
					//cancel: 0,
					options : tos,
			
					title : 'Action By'
				};
				dialog_to = Ti.UI.createOptionDialog(opts_to);
				dialog_to.addEventListener('click', function(e) {
					//alert(e.index);
					if(e.index != null && e.index >= 0){
						to_label.text = ' ' + tos[e.index];	
						selected_to = tos_ids[e.index];
					}
					
				});
			}
		}
	
	}
	
	
	
	
	
	var b = Titanium.UI.createButton({
		title : "Back"
	});
	self.leftNavButton = b;
	var c = Titanium.UI.createButton({
		title : "Update"
	});
	self.rightNavButton = c;
	b.addEventListener('click', function() {
		var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
		var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,ItemId,sts,e_by,a_by);
		punchListItemDetail.right = width
		punchListItemDetail.open(slide_right);
		self.close();
		self = null;
		win1.close();
		win1 = null;
	});
	
	win1.add(nav);
	
	var pl_room_lbl = Ti.UI.createLabel({
		top:63,
		left:2,
		text:"Room:",
		font : {
			fontSize : 14
		},
	});
	
	var pl_room = Ti.UI.createTextField({
		top:63,
		height:25,
		left:100,
		width:200,
		backgroundColor:'white',
		value:Room,
	});
	self.add(pl_room_lbl);
	self.add(pl_room);
	
	var pl_location_lbl = Ti.UI.createLabel({
		top:94,
		height:30,
		left:3,
		width:95,
		text:'Location:',
		font : {
			fontSize : 14
		},
	});
	self.add(pl_location_lbl);
	
	var pl_location = Ti.UI.createTextField({
		top:94,
		height:25,
		left:100,
		width:200,
		backgroundColor:'white',
		value:Location,
	});
	self.add(pl_location);
	
	var pl_discipline_lbl = Ti.UI.createLabel({
		top:125,
		height:30,
		left:3,
		width:95,
		text:'Discipline:',
		font : {
			fontSize : 14
		},
	});
	self.add(pl_discipline_lbl);
	
	var ds_selection = Ti.UI.createView({
		top : 125,
		height : 31,
		left :100,
		width : 200,
		borderWidth : 3,
		borderRadius : 12,
		borderColor : 'white'
	});
	
	var ds_label = Ti.UI.createLabel({
		top : 6,
		left : 9,
		color : '#375513',
		font : {
			fontSize : 14
		},
		width : 175,
		text : Discipline,
	});

	var drop_down_ds = Ti.UI.createImageView({
		image : '/images/green_down_arrow.png',
		height : 11,
		width : 11,
		top : 10,
		right : 10,
	});
	
	ds_selection.add(ds_label);
	ds_selection.add(drop_down_ds);


	ds_selection.addEventListener('click', function() {
		if(tos.length > 0){
			dialog_ds.show();
		}else{
			alert("No data avaiable , please contact project manager for details");
		}
		
	});
	
	self.add(ds_selection);
	
	var pl_description_lbl = Ti.UI.createLabel({
		top:156,
		height:30,
		left:3,
		width:95,
		text:'Description:',
		font : {
			fontSize : 14
		},
	});
	self.add(pl_description_lbl);
	
	var pl_description = Ti.UI.createTextArea({
		top:156,
		height:75,
		left:100,
		width:200,
		backgroundColor:'white',
		value:Description,
	});
	self.add(pl_description);
	
	var to_lbl = Ti.UI.createLabel({
		top : 237,
		height : 31,
		left : 4,
		width : 95,
		font : {
			fontSize : 14
		},
		text : 'Action By: ',
	});
	self.add(to_lbl);
	var to_selection = Ti.UI.createView({
		top : 237,
		height : 31,
		left :100,
		width : 200,
		borderWidth : 3,
		borderRadius : 12,
		borderColor : 'white'
	});
	var to_label = Ti.UI.createLabel({
		top : 6,
		left : 9,
		color : '#375513',
		font : {
			fontSize : 14
		},
		width : 175,
		text : 'Please select',
	});

	var drop_down_to = Ti.UI.createImageView({
		image : '/images/green_down_arrow.png',
		height : 11,
		width : 11,
		top : 10,
		right : 10,
	});
	
	to_selection.add(to_label);
	to_selection.add(drop_down_to);


	to_selection.addEventListener('click', function() {
		if(tos.length > 0){
			dialog_to.show();
		}else{
			alert("No data avaiable , please contact project manager for details");
		}
		
	});
	
	self.add(to_selection);
	
	var cm_lbl = Ti.UI.createLabel({
		top : 280,
		height : 31,
		left : 4,
		width : 95,
		font : {
			fontSize : 14
		},
		text : 'Completed: ',
	});
	self.add(cm_lbl);
	var cm_selection = Ti.UI.createView({
		top : 280,
		height : 31,
		left :100,
		width : 200,
		borderWidth : 3,
		borderRadius : 12,
		borderColor : 'white'
	});
	var cm_label = Ti.UI.createLabel({
		top : 6,
		left : 9,
		color : '#375513',
		font : {
			fontSize : 14
		},
		width : 175,
		text : Complete,
	});

	var drop_down_cm = Ti.UI.createImageView({
		image : '/images/green_down_arrow.png',
		height : 11,
		width : 11,
		top : 10,
		right : 10,
	});
	
	cm_selection.add(cm_label);
	cm_selection.add(drop_down_cm);


	cm_selection.addEventListener('click', function() {
		if(tos.length > 0){
			dialog_cm.show();
		}else{
			alert("No data avaiable , please contact project manager for details");
		}
		
	});
	
	self.add(cm_selection);
	
	var pl_note_lbl = Ti.UI.createLabel({
		top:315,
		height:30,
		left:3,
		width:95,
		text:'Notes:',
		font : {
			fontSize : 14
		},
	});
	self.add(pl_note_lbl);
	
	var pl_note = Ti.UI.createTextArea({
		top:315,
		height:75,
		left:100,
		width:200,
		backgroundColor:'white',
		value:"",
	});
	self.add(pl_note);
	var old_pl_note = Ti.UI.createWebView({
		top:400,
		height:85,
		left:10,
		width:width-20,
		html:CompletionNote,
	});
	self.add(old_pl_note);
	var item_image = Titanium.UI.createTextField({
		top:500,
		height:25,
		left:5,
		width:200,
		backgroundColor:'White',
		hintText:'Image'
		//image:ItemImage
	});
	var img_lbl = Ti.UI.createButton({
		right:5,
		top:510,
		height:25,
		width:100,
		title:"Add Image"
	});
	
	var thumb_img = Ti.UI.createImageView({
		right:140,
		top:410,
		width:50,
		height:80
	});
	self.add(thumb_img);
	item_img = ItemImage;
	//self.add(item_image);
	self.add(img_lbl);
//	Titanium.Media.showCamera
//	Titanium.Media.openPhotoGallery
//	event.media
	img_lbl.addEventListener("click",function(){
		


		var alert2 = Titanium.UI.createAlertDialog({ title: 'Select image', message: ' ', buttonNames: ['Camera', 'Gallery'], cancel: 1 });
        alert2.addEventListener('click', function(e) { Ti.API.info('e = ' + JSON.stringify(e));
		   //Clicked cancel, first check is for iphone, second for android
		   
		    //now you can use parameter e to switch/case
		
		   switch (e.index) {
		      case 0: 
		        Titanium.Media.showCamera({
					success:function(event){
						//alert("sucess")
						//item_image.image = event.media;
						item_img = event.media;
						thumb_img.image = item_img;
					},
					cancel:function(){
						alert("No picture  captured");
						item_img= null;
						thumb_img.image = item_img;
					},
					error:function(){
						alert("An unknown error occured");
						
						item_img = null;
						thumb_img.image = item_img;
					}
				});
		      break;
		
		      //This will never be reached, if you specified cancel for index 1
		      case 1: 
		        Titanium.Media.openPhotoGallery({
					success:function(event){
						//alert("sucess")
						//item_image.image = event.media;
						item_img = event.media;
						thumb_img.image = item_img;
					},
					cancel:function(){
						alert("No picture selected");
						
						item_img = null;
						thumb_img.image = item_img;
					},
					error:function(){
						alert("An unknown error occured");
						
						item_img = null;
						thumb_img.image = item_img;
					}
				});
		      break;
		
		      default:
		      break;
		
		  }
		});
		alert2.show();




	});
	c.addEventListener('click',function(){
		//selected_to = selected_to ? selected_to : 1;
		//selected_issue = selected_issue ? selected_issue : 1;
		//alert("ok");
		//alert(selected_to);
		//return;
		self.add(loader);
		loader.show();
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/PLItemEdit';
		
		/*var hyt = item_img.height;
		var wdh = item_img.width;
		
		var wh_ratio = wdh/hyt;*/
		var imv = Ti.UI.createImageView({
			image:item_img
		});
		/*
		if(wh_ratio > 1){
			imv.width = 600;
			imv.height = 600/wh_ratio;
		}else{
			imv.height = 600;
			imv.width = 600/wh_ratio;
		}
		*/
		
		item_img = imv.toImage();
		
		//should must add itemid here and pass that to web service
		var Data = {"PLID": PLID,"ItemId": ItemId,"Room" : pl_room.value , "Location":pl_location.value , "Discipline" : selected_ds,"Description":pl_description.value,"ActionBy":selected_to ,"ImageFile":item_img,"FileName":"photo.png","Complete":selected_cm,"CompletionNotes":pl_note.value};
		//Data = {"PLID": PLID,"ItemId": ItemId,"Room" : pl_room.value , "Location":pl_location.value , "Discipline" : selected_ds,"Description":pl_description.value,"ActionBy":selected_to,"FileName":"photo.png","Complete":selected_cm,"CompletionNotes":pl_note.value};
		
		//alert(JSON.stringify(Data));
		xhr.open('POST',url);
		xhr.setRequestHeader('content-type','application/json');
		xhr.send(Data);
		xhr.onerror = function(){
			loader.hide();
			alert(JSON.stringify(this));
		}
		xhr.onload = function(){	
			loader.hide();
			//alert(JSON.stringify(this));
			if(this.status == 200){
				var item_id = this.responseText;
				var PunchListItemDetail = require('ui/handheld/PunchListItemDetail');
				var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,item_id,sts,e_by,a_by);
				punchListItemDetail.left = width;
				punchListItemDetail.open(slide_left);
				showMessageTimeout("Item Successfully Updated");
				self.close();
				self = null;
				win1.close();
				win1 = null;
			
				
			}
		}
		
	});
	
	return win1;
}

module.exports = EditPunchListItem;
