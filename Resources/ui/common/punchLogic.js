function executeAsync(func) {
	setTimeout(func, 0);
}

function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key].toUpperCase();
		var y = b[key].toUpperCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function make_basic_auth(user, password) {
	var tok = user + ':' + password;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}

function barView(top, left, width, height, color) {
	height = height ? height : 2;
	color = color ? color : 'black';
	left = left ? left : 0;
	width = width ? width : Ti.Platform.displayCaps.platformWidth;
	var bar = Ti.UI.createView({
		left : left,
		width : width,
		top : top,
		height : height,
		backgroundColor : color
	});
	return bar;
}

showMessageTimeout = function(customMessage, interval) {
	indWin = Titanium.UI.createWindow();
	var slide_it_left = Titanium.UI.createAnimation();

	slide_it_left.top = 300;
	slide_it_left.duration = 1000;
	var indView = Titanium.UI.createView({
		height : 50,
		width : 275,
		borderRadius : 8,
		borderWidth : 3,
		borderColor : 'white',
		backgroundColor : '#EFEFEF'
	});
	//#375B0E
	indWin.add(indView);

	var message = Titanium.UI.createLabel({
		text : customMessage && typeof (customMessage !== 'undefined') ? customMessage : L('Not Aavilable'),
		color : '#000000',
		width : 260,
		height : 'auto',
		textAlign : 'center',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 16,
			fontWeight : 'bold'
		}
	});

	indView.add(message);
	indWin.open(slide_it_left);

	var mst_clk = indWin.addEventListener('click', function() {
		Titanium.API.info('clicked');
		indWin.close();
	});
	var mst_clk = indView.addEventListener('click', function() {
		Titanium.API.info('clicked');
		indWin.close();
	});

	interval = interval ? interval : 3000;
	setTimeout(function() {
		indWin.close({
			opacity : 0,
			duration : 200
		});
	}, interval);

	return indWin;
}
info_window = function(header, customMessage) {
	// window container
	Win = Titanium.UI.createWindow({
		height : '100%',
		width : '100%',

	});
	var opacity_view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : 'black',
		opacity : 0.6
	});
	Win.add(opacity_view);
	var mainview = Ti.UI.createView({
		opacity : 1,
		height : 160,
		width : 310,
		backgroundColor : 'white',
		borderRadius : 8,
		borderWidth : 2,
		borderColor : '#375B0E',
	});
	//  view
	var vew = Ti.UI.createView({
		top : 0,
		backgroundColor : '#9ABF6F',
		backgroundGradient : {
			type : 'linear',
			colors : [{
				color : '#99C06F',
				offset : 0.0
			}, {
				color : '#8BB25C',
				offset : 0.25
			}, {
				color : '#76A145',
				offset : 1.0
			}],
			startPoint : {
				x : 0,
				x : 100,
				y : 0
			},
			endPoint : {
				x : 100,
				y : 100
			},
			backFillStart : false
		},
		height : 40,
		width : 310
	});
	var vew_text = Ti.UI.createLabel({
		text : header,
		top : 5,
		bottom : 5,
		left : 10,
		color : '#375513',
		font : {
			fontSize : 14
		},
	});
	vew.add(vew_text);
	var cross = Ti.UI.createImageView({
		right : 8,
		top : 2,
		bottom : 2,
		//left:150,
		image : '/images/close_button.png'
	});
	vew.add(cross);

	var indView = Titanium.UI.createScrollView({
		top : 40,
		height : 120,
		width : 300,
		backgroundColor : '#F3F3F3'
	});

	mainview.add(indView);

	// message

	var message = Titanium.UI.createLabel({
		text : customMessage && typeof (customMessage !== 'undefined') ? customMessage : L('Not Available'),
		color : 'black',
		width : 'auto',
		height : 'auto',
		textAlign : 'center',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 13,
			fontWeight : 'bold'
		}
	});

	indView.add(message);
	mainview.add(vew);
	Win.add(mainview)
	Win.open();

	var mst_clk = cross.addEventListener('click', function() {
		Win.close({
			opacity : 0
		});
	});

	var mst_clk = vew.addEventListener('click', function() {
		Win.close({
			opacity : 0
		});
	});
}

