//Application Window Component Constructor
var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
var xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(15000);

Ti.include("/ui/common/punchLogic.js");
Ti.include("/ui/common/Base64.js");
function LoginWindow() {
	//load component dependencies
	
	
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
		backgroundColor:'#ffffff',
		title:'Login'
	});
	
	
	var logo_view = Ti.UI.createImageView({
		image: '/images/MLlogo.jpg',
		top:20,
		left:0,
		width:width,
		height:60
	});
	
	var username_lbl = Ti.UI.createLabel({
		text:'Username',
		top:125,
		left:40,
		width:width
	});
	
	var username_fld = Ti.UI.createTextField({
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		hintText:' email/username',
		top:150,
		left:40,
		width:width - 80,
		height:28,
		borderWidth:1,
		borderColor:'#01020a',
		borderRadius:3
	});
	
	
	var password_lbl = Ti.UI.createLabel({
		text:'Password',
		top:180,
		left:40,
		width:width
	});
	
var password_fld = Ti.UI.createTextField({
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		passwordMask:true,
		hintText:' password',
		top:205,
		left:40,
		width:width - 80,
		height:28,
		borderWidth:1,
		borderColor:'#01020a',
		borderRadius:3
	});
	var remember_me_lbl = Ti.UI.createLabel({
		text:'Remember me',
		top:240,
		right:100,
		width:140
	});
	var remember_me_sw = Ti.UI.createSwitch({
		top:240,
		right: 40,
		value:true
	})
	if(Titanium.App.Properties.getString('auto_login')){
		username_fld.value = Titanium.App.Properties.getString("username");
		password_fld.value = Titanium.App.Properties.getString("password");
	}
	self.add(remember_me_lbl);
	self.add(remember_me_sw);
	var submit_btn = Ti.UI.createButton({
		top:280,
		backgroundColor:'blue',
		right:40,
		width:width/3.5,
		height:40,
		title:'Login',
		borderWidth:1,
		BorderRadius:6
		
	});
	
	submit_btn.addEventListener('click',function(){
	   self.add(loader);
	   loader.show();
		
		
		
		var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/UserLogin';
		//url = 'http://192.168.5.50/action.php?req_method=get&proxy_url=http://innovativespinning.appspot.com/service/interval/category/101?minimal=true';
		var username_val =  username_fld.value.toString();
		var password_val = password_fld.value.toString();
		//var Data = {"Username": username_fld.value, "Password": password_fld.value};
		var Data = {"Username": username_val, "Password": password_val};
		
		//var url = 'https://dev.masterlibrary.com/Service/Mobile.svc/GetProjects';
		//var Data = {"UserId":14};
		xhr.open('POST',url);
		
		//xhr.open('GET',url);
		
		xhr.setRequestHeader('content-type','application/json');
		//alert(JSON.stringify(Data));
		xhr.send(JSON.stringify(Data));
		
		//xhr.send();
		xhr.onerror = function(){
			loader.hide();
			alert(JSON.stringify(this));
		}
		xhr.onload = function(){
			//alert(this.responseText);
			loader.hide();	
			if(this.status == 200 && this.responseText > 0){
				//self.close();
				if(remember_me_sw.value == true){
					Titanium.App.Properties.setString('auto_login',this.responseText);
				    Titanium.App.Properties.setString('username',username_fld.value.toString());
				    Titanium.App.Properties.setString('password',password_fld.value.toString());
				}else{
					Titanium.App.Properties.removeProperty('auto_login');
				    Titanium.App.Properties.removeProperty('username');
				    Titanium.App.Properties.removeProperty('password');
				}
				Titanium.App.Properties.setString('userId',this.responseText);
				var ProjectListing = require('ui/handheld/ProjectListing');
				var projectListing = ProjectListing();
				projectListing.left = width;
				var slide_left = Ti.UI.createAnimation();
				slide_left.left=0;
				slide_left.duration = 400;
				projectListing.open(slide_left);
				self.close();
				self = null;
				//showMessageTimeout("Login successfull");
				username_fld.value = '';
				password_fld.value = '';
					
			}else{
				
				showMessageTimeout("Invalid credentials, please try again");
				password_fld.value = '';
				username_fld.value = '';
			}
		}
	});
	self.add(logo_view);
	self.add(username_lbl);
	self.add(username_fld);
	self.add(password_lbl);
	self.add(password_fld);
	
	self.add(submit_btn);
	
	
	
	return self;
}

//make constructor function the public component interface
module.exports = LoginWindow;
