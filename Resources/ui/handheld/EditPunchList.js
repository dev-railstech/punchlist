var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);
Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function EditPunchList(project_id, project_name, client_name,PLID,IssueId,ActionBy,EnteredBy,Status,PLVisitDate,PLTitle,PLNumber) {
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
		title : 'Edit Punch List'
	});
	
	var data = [];
	//alert(to);
	
	var issues = ['Please select'];
	var issues_ids = [0];
	var tos = ['Please select'];
	var tos_ids = [0];
	var dialog,dialog_to;
	var selected_issue = 0;
	var selected_to = 0;
	
	
	
	
	var opts_issue = {
		//cancel: 0,
		options : issues,

		title : 'Issues'
	};
	dialog_issue = Ti.UI.createOptionDialog(opts_issue);
	dialog_issue.addEventListener('click', function(e) {
		
		if(e.index != null && e.index >= 0 ){
			issue_label.text = ' ' + issues[e.index];	
			selected_issue = issues_ids[e.index];
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
	load_issues();
	function load_issues(){
		self.add(loader);
		loader.show();
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetProjectIssues';
		var Data = {"ProjectId": project_id};
		xhr.open('POST',url);
		xhr.setRequestHeader('content-type','application/json');
		xhr.send(JSON.stringify(Data));
		xhr.onerror = function(){
			alert(JSON.stringify(this));
			loader.hide();
		}
		xhr.onload = function(){
			loader.hide();	
			if(this.status == 200){
				//alert(this.responseText);
				var response = JSON.parse(this.responseText);
				for(var i=0;i<response.length;i++){
					issues.push(response[i].IssueName);
					issues_ids.push(response[i].IssueId);
				}
				issue_label.text = ' ' + issues[issues_ids.indexOf(IssueId)];
				selected_issue = IssueId;
				opts_issue = {
					//cancel: 0,
					options : issues,
				
					title : 'Issues'
				};
				
				dialog_issue = Ti.UI.createOptionDialog(opts_issue);
				dialog_issue.addEventListener('click', function(e) {
					if(e.index != null  && e.index >= 0){
						issue_label.text = ' ' + issues[e.index];	
						selected_issue = issues_ids[e.index];
					}
					
				});
				
				load_tos();
			}
		}
	
	}
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
					if(response[i].UserId != Ti.App.Properties.getString('userId')){
					
						tos.push(response[i].UserName);
						tos_ids.push(response[i].UserId);
					}
				}
				//alert(JSON.stringify(tos_ids));
				to_label.text = ' ' + tos[tos_ids.indexOf(ActionBy)];
				selected_to = ActionBy;
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
	
	var selected_date = null;
	var status_index = 0;
	

	var win1 = Titanium.UI.createWindow({
		//backgroundColor:
	});
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : self
	});
	var b = Titanium.UI.createButton({
		title : PLNumber
	});
	self.leftNavButton = b;
	b.addEventListener('click', function() {
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
	

	var pl_date_lbl = Ti.UI.createLabel({
		top:63,
		left:2,
		text:"Visit Date:",
		font : {
			fontSize : 14
		},
	});
	
	var pl_date = Ti.UI.createTextField({
		top:63,
		height:25,
		left:80,
		width:230,
		backgroundColor:'white',
		value: PLVisitDate
	});
	self.add(pl_date_lbl);
	self.add(pl_date);
	pl_date.addEventListener('focus',function(){
		//alert("clicked");
		pl_date.blur();
		selectDateFromCal();
		
	});
	
	var pl_title_lbl = Ti.UI.createLabel({
		top:94,
		height:30,
		left:3,
		width:70,
		text:'Title:',
		font : {
			fontSize : 14
		},
	});
	self.add(pl_title_lbl);
	//alert(PLTitle);
	//alert(PLNumber);
	var pl_title_txt = Ti.UI.createTextField({
		top:94,
		height:25,
		left:80,
		width:230,
		backgroundColor:'white',
		text:PLTitle
	});
	pl_title_txt.value = PLTitle;
	self.add(pl_title_txt);
	
	var to_lbl = Ti.UI.createLabel({
		top : 125,
		height : 31,
		left : 4,
		width : 76,
		font : {
			fontSize : 14
		},
		text : 'Action By: ',
	});
	self.add(to_lbl);
	var to_selection = Ti.UI.createView({
		top : 125,
		height : 31,
		left : 80,
		width : 230,
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
		width : 200,
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
	
	var issue_lbl = Ti.UI.createLabel({
		top : 160,
		height : 31,
		left : 4,
		width : 76,
		font : {
			fontSize : 14
		},
		text : 'Issue: ',
	});
	self.add(issue_lbl);
	var issue_selection = Ti.UI.createView({
		top : 160,
		height : 31,
		left : 80,
		width : 230,
		borderWidth : 3,
		borderRadius : 12,
		borderColor : 'white'
	});
	var issue_label = Ti.UI.createLabel({
		top : 6,
		left : 9,
		color : '#375513',
		font : {
			fontSize : 14
		},
		width : 200,
		text : 'Please select',
	});

	var drop_down = Ti.UI.createImageView({
		image : '/images/green_down_arrow.png',
		height : 11,
		width : 11,
		top : 10,
		right : 10,
	});
	
	issue_selection.add(issue_label);
	issue_selection.add(drop_down);

	issue_selection.addEventListener('click', function() {
		if(issues.length > 0){
			dialog_issue.show();
		}else{
			alert("No data avaiable , please contact project manager for details");
		}	
	});
	
	self.add(issue_selection);
	
	var update_btn = Ti.UI.createButton({
		top:220,
		right:40,
		left:40,
		title:'Update'
	});
	
	self.add(update_btn);
	
	update_btn.addEventListener('click',function(){
		//selected_to = selected_to ? selected_to : 1;
		//selected_issue = selected_issue ? selected_issue : 1;
		var pl_ttl = pl_title_txt.value;
		
		var visit_date = pl_date.value;
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/PunchListEdit';
		var Data = {"ProjectId": project_id,"PLVisitDate" : visit_date , "PLTitle":pl_ttl , "PLID" : PLID,"ActionBy":selected_to,"IssueId":selected_issue};
		//alert(JSON.stringify(Data));
		xhr.open('POST',url);
		xhr.setRequestHeader('content-type','application/json');
		xhr.send(JSON.stringify(Data));
		xhr.onerror = function(){
			alert(JSON.stringify(this));
		}
		xhr.onload = function(){	
			if(this.status == 200){
				var PunchListDetail = require('ui/handheld/PunchListDetail');
			
				var punchListDetail = PunchListDetail(project_id, project_name, client_name,PLID,PLNumber,PLTitle);
				punchListDetail.left = width;
				punchListDetail.open(slide_left);
				showMessageTimeout('Punch List Successfully Updated');
				self.close();
				self = null;
				win1.close();
				win1 = null;
			}
		}
		
	});
	
	var datePicker = null;
	
	function selectDateFromCal(){
		if(datePicker==null){
			var pWidth = Ti.Platform.displayCaps.platformWidth;
			var pHeight = Ti.Platform.displayCaps.platformHeight;
			var win = Ti.UI.createView();
			win.backgroundColor = 'black';
			
			var minDate = new Date();
			minDate.setFullYear(1950);
			minDate.setMonth(0);
			minDate.setDate(1);
			
			var maxDate = new Date();
			maxDate.setFullYear(3000);
			maxDate.setMonth(11);
			maxDate.setDate(31);
			
			var value = new Date();
			// value.setFullYear(2009);
			// value.setMonth(0);
			// value.setDate(1);
			
			var picker = Ti.UI.createPicker({
				useSpinner: true,
				type:Ti.UI.PICKER_TYPE_DATE,
				minDate:minDate,
				maxDate:maxDate,
				value:value
			});
			
			// turn on the selection indicator (off by default)
			picker.selectionIndicator = true;
			picker.setLocale(Titanium.Platform.locale);
			win.add(picker);
			var okButton = Ti.UI.createButton({
				title:'Set',
				bottom:50,
				width:pWidth/4,
				height:40,
				right: pWidth/2,
				backgroundImage:'/images/toggle_bg.png'
			});
			
			var cancelButton = Ti.UI.createButton({
				title:'Cancel',
				bottom:50,
				width:pWidth/4,
				height:40,
				left: pWidth/2+10,
				backgroundImage:'/images/toggle_bg.png'
			});
			
			selected_date = value;
			
			
			var label = Ti.UI.createLabel({
				text:selected_date,
				top:6,
				width:'auto',
				height:'auto',
				textAlign:'center',
				color:'white'
			});
			win.add(label);
			var pickerChange = picker.addEventListener('change',function(e)
			{
				selected_date = e.value;
				var d = new Date(selected_date);
				var d_str = '';
				if(d.getMonth()+1 <10){
					var m =d.getMonth()+1;
					d_str+= '0' + m + '/';		
				}else{
					d_str+= d.getMonth()+1 + '/';
				}
				if(d.getDate() < 10){
					
					d_str+= '0'+d.getDate() + '/';
				}else{
					d_str+= d.getDate() + '/';	
				}
				
				d_str+= d.getFullYear();
				
				pl_date.value = d_str;
			});
			
			var okButtonClick = okButton.addEventListener('click', function() {
				win.hide();
				var d = new Date(selected_date);
				var d_str = '';
				if(d.getMonth()+1 < 10){
					var m = d.getMonth()+1;
					d_str+= '0' + m + '/';		
				}else{
					Ti.API.info(">");
					d_str+= d.getMonth()+1 + '/';
				}
				if(d.getDate() < 10){
					d_str+= '0'+d.getDate() + '/';
				}else{
					d_str+= d.getDate() + '/';	
				}
				
				d_str+= d.getFullYear();
				
				pl_date.value = d_str;
				
			});
			
			var cancelButtonClick = cancelButton.addEventListener('click', function() {
				win.hide();
			});
			win.add(okButton);
			win.add(cancelButton);
			datePicker = win;
	
			self.add(datePicker);	
		}else{
			datePicker.show();
		} 	
	}
	
	return win1;
}

module.exports = EditPunchList;
