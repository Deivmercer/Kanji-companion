// Context menu entry listener 2: Electric Boogaloo; This actually creates the dialog with the infos
chrome.runtime.onMessage.addListener(function(message, sender) {

	if(message.data !== "") {
		console.log(message.data);
		let dialog = $("#wtk");
		if (dialog.length === 0) {
			dialog = $("<div id='wtk'></div>").appendTo('body');
		}

		let dialogContent = `
			<p> 
				${message.data[0].japanese[0].word} (${message.data[0].japanese[0].reading}) <br>
				${message.data[0].senses[0].english_definitions.toString()}
			</p>
		`

		dialog.html(dialogContent)
			.dialog({
				// modal: true,
				draggable: false,
				resizable: false
			})
			.bind('dialogclose', function(event, ui) {
				console.log("closing");
				// destroy()?
			});
	}
});
