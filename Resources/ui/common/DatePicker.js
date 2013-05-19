/*function DatePicker() {
	
	Ti.include('/ui/common/nightLogic.js');
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	var win = Ti.UI.createView();
	win.backgroundColor = 'black';
	
	var minDate = new Date();
	minDate.setFullYear(2009);
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
		bottom:10,
		width:pWidth/4,
		height:40,
		right: pWidth/2,
		backgroundImage:'/images/toggle_bg.png'
	});
	
	var cancelButton = Ti.UI.createButton({
		title:'Cancel',
		bottom:10,
		width:pWidth/4,
		height:40,
		left: pWidth/2+10,
		backgroundImage:'/images/toggle_bg.png'
	});
	
	var label = Ti.UI.createLabel({
		text:'Choose a date',
		top:6,
		width:'auto',
		height:'auto',
		textAlign:'center',
		color:'white'
	});
	win.add(label);

	var selectedDate = null;
	picker.addEventListener('change',function(e)
	{
		label.text = e.value;
		selectedDate = e.value;
	});
	
	okButton.addEventListener('click', function() {
		win.hide();
		// alert('selectedDate '+selectedDate);
		setCalDate(selectedDate);
	});
	
	cancelButton.addEventListener('click', function() {
		setCalDate(null);
		win.hide();
	});
	win.add(okButton);
	win.add(cancelButton);

	return win;

};

module.exports = DatePicker;*/