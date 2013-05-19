var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(10000);
		
		
Ti.include("/ui/common/punchLogic.js");

function NewPunchListItem(project_id, project_name, client_name,PLID,PLNumber,PLTitle,sts,e_by) {
	var slide_left = Ti.UI.createAnimation();
	slide_left.left=0;
	slide_left.duration = 400;
	
	var slide_right = Ti.UI.createAnimation();
	slide_right.right = 0; 
	slide_right.duration = 400;
	var self = Ti.UI.createWindow({
		backgroundColor : '#EEEEEE',
		width : width,
		height : height,
		title : 'New Item'
	});
	var item_id;
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
		  message:'Loading',
		  bottom:50
	});
	
	
	var item_img;
	
	var tos = ['Please select'];
	var tos_ids = [0];
	var dialog_to;
	var selected_to =null;
	
	var disciplines = ['A - Architectural','C - Civil','E - Electrical','LS - Life Safety','M - Mechanical','P - Plumbing','S - Structural','T - Technology'];
	var disciplines_ids = ['A - Architectural','C - Civil','E - Electrical','LS - Life Safety','M - Mechanical','P - Plumbing','S - Structural','T - Technology'];
	var selected_ds= null;
	
	
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
				opts_to = {
					//cancel: 0,
					options : tos,
			
					title : 'Action By'
				};
				dialog_to = Ti.UI.createOptionDialog(opts_to);
				dialog_to.addEventListener('click', function(e) {
					//alert(e.index);
					if(e.index != null && e.index >= 0 ){
						to_label.text = ' ' + tos[e.index];	
						selected_to = tos_ids[e.index];
					}
					
				});
			}
		}
	
	}
	
	
	
	
	
	var b = Titanium.UI.createButton({
		title : PLTitle
	});
	self.leftNavButton = b;
	var c = Titanium.UI.createButton({
		title : "Create"
	});
	self.rightNavButton = c;
	b.addEventListener('click', function() {
		var PunchListDetail = require('ui/handheld/PunchListDetail');
		var punchListDetail = PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle);
		PunchListDetail.right = width;
		punchListDetail.open(slide_right);
		//showMessageTimeout('Loading....');
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
		hintText:' Room',
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
		hintText:' Location',
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
		top : 123,
		height : 30,
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
		text : 'Please select',
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
		height:125,
		left:100,
		width:200,
		backgroundColor:'white',
		hintText:' Description',
	});
	self.add(pl_description);
	
	var to_lbl = Ti.UI.createLabel({
		top : 287,
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
		top : 287,
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
	
	
	var item_image = Titanium.UI.createTextField({
		top:330,
		height:25,
		left:5,
		width:200,
		backgroundColor:'White',
		hintText:'Image'
	});
	var img_lbl = Ti.UI.createButton({
		right:5,
		top:330,
		height:25,
		width:100,
		title:"Add Image"
	});
	var progress_bar = Titanium.UI.createProgressBar({
		bottom:10,
		left:20,
		width:width-40,
		min:0.0,
		max:1,
		value:0
	})
	//self.add(progress_bar);
	var thumb_img = Ti.UI.createImageView({
		right:140,
		top:330,
		width:50,
		height:80		
	});
	//self.add(item_image);
	self.add(img_lbl);
	self.add(thumb_img);
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
						item_img = null;
						thumb_image.image = item_img;
					},
					error:function(){
						item_img = null;
						thumb_image.image = item_img;
						alert("An unknown error occured");
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
						item_img = null;
						thumb_image.image = item_img;
						alert("No picture selected");
					},
					error:function(){
						item_img = null;
						thumb_image.image = item_img;
						alert("An unknown error occured");
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
		var xhr_plia = Titanium.Network.createHTTPClient();
		xhr_plia.setTimeout(100000);
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/PLItemAdd';
		//url = 'http://192.168.8.1:3000/punches.json'
		//url = 'https://dev.masterlibrary.com/Services/MasterLibrary.asmx/PLItemAdd';
		var pl_room_val = pl_room.value;
		var pl_location_val = pl_location.value;
		var pl_description_val = pl_description.value;
		if(pl_room_val.length < 1 || pl_location_val.length < 1 || pl_description_val.length < 1 || selected_ds == null || selected_to == null){
			alert("Please fill in all fields");
			loader.hide();
			return;
		} 
		var Data;
		if(item_img == null || (item_img.height < 1000 && item_img.width < 1000)){
			Data = {"PLID": PLID,"Room" : pl_room_val , "Location":pl_location_val , "Discipline" : selected_ds,"Description":pl_description_val,"ActionBy":selected_to,"ImageFile":item_img,"FileName":"photo.png"};
			
		}else{
			//var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'photo.png');
			//f.write(item_img);
			//alert(f.size);
			var hyt = item_img.height;
			var wdh = item_img.width;
			
			var wh_ratio = wdh/hyt;
			var imv = Ti.UI.createImageView({
				image:item_img
			});
			
			if(wh_ratio > 1){
				imv.width = 1000;
				imv.height = 1000/wh_ratio;
			}else{
				imv.height = 1000;
				imv.width = 1000/wh_ratio;
			}
			
			item_img = imv.toImage();
			//alert(item_img.width + "     " + item_img.height);
			
			Data = {"PLID": PLID,"Room" : pl_room_val , "Location":pl_location_val , "Discipline" : selected_ds,"Description":pl_description_val,"ActionBy":selected_to,"ImageFile":item_img,"FileName":"photo.png"};
		}
		//Data = {"punch[image]":item_img,type:"photo",name:"abc.png"}
		//alert(JSON.stringify(Data));
		
		//xhr_plia.setRequestHeader('enctype','multipart/form-data');
		
		xhr_plia.open('POST',url);
		xhr_plia.setRequestHeader('enctype','multipart/form-data');
		xhr_plia.send(Data);
		xhr_plia.onerror = function(){
			loader.hide();
			alert(JSON.stringify(this));
		}
		
		xhr_plia.onload = function(){
			loader.hide();
			
			if(this.status == 200){
				item_id = this.responseText;
			//	setTimeout(function() {
					
					var PunchListDetail = require('ui/handheld/PunchListDetail');
					var punchListDetail = PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle)
					//var punchListItemDetail = PunchListItemDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle,item_id,sts,e_by);
					PunchListDetail.left = width;
					punchListDetail.open(slide_left);
					showMessageTimeout("Item Successfully Created");
					self.close();
					self = null;
					win1.close();
					win1 = null;
					
			//	}, 200);
				
			}
		}
		
	});
	
	return win1;
}

module.exports = NewPunchListItem;
