// Context menu entry listener 2: Electric Boogaloo; This actually creates the dialog with the infos

chrome.runtime.onMessage.addListener(function(message, sender) {

	let data = message.data;

	if (!data) {
		console.log("Data is empty");
		return;
	}

	let dialog = $("#wtk");
	if (dialog.length === 0)
		dialog = $("<div id='wtk'></div>").appendTo('body');
	let dialogContent = "<p><select id='idList'>";
	for (let i = 0; i < data.length; i++)
		dialogContent += `<option value="${i}">${i}</option>`;
	dialogContent += "</select><div id='dialogContent'></div>"
	dialog.html(dialogContent)
		.dialog({
			// modal: true,
			draggable: false,
			resizable: false
		})
		.css("white-space","pre-wrap")
		.bind('dialogclose', function(event, ui) {
			console.log("closing");
			// destroy()?
		});
	if (data.length === 1)
		$("#idList").attr("disabled", true);
	$("#idList").on("change", function() {
			let dataId = $("#idList").val();
			let content = "Kanji: " + data[dataId].japanese[0].word + "<br>Reading: (" + data[dataId].japanese[0].reading + ")<br>Meanings:";
			for(let sense of data[dataId].senses)
				content += sense.english_definitions.toString() + ", ";
			$("#dialogContent").html(content);
		})
		.val(0).change();
});
