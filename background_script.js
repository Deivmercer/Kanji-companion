// Context menu entry creation
chrome.runtime.onInstalled.addListener(function() {

	chrome.contextMenus.create({
		id: "WTK",
		title: "Search on Jisho",
		contexts: ["selection"]
	});
});

// Script injections; should run every time a new page is loaded on the current tab
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

	if (changeInfo.status === "complete" && tab.active) {
		chrome.tabs.executeScript(tab.id, {file: 'jquery-3.5.1.min.js', allFrames: true});
		chrome.tabs.executeScript(tab.id, {file: 'jquery-ui.min.js', allFrames: true});
		chrome.tabs.executeScript(tab.id, {file: "content_script.js"});
	}
})

// Context meny entry listener; It send the selected text to the content script
chrome.contextMenus.onClicked.addListener(function(info, tab) {

	if (info.menuItemId === "WTK") {
		// chrome.tabs.executeScript(tab.id, {file: 'jquery-3.5.1.min.js', allFrames: true});
		// chrome.tabs.executeScript(tab.id, {file: 'jquery-ui.min.js', allFrames: true});
		// chrome.tabs.executeScript(tab.id, {file: "content_script.js"});
		if(info.selectionText !== "") {
			fetch("https://jisho.org/api/v1/search/words?keyword=" + info.selectionText/*, {mode: 'cors'}*/).then(res => {

				if (res.status !== 200) {
					console.log("*sad extension noises* Status code: " + res.status);
					return;
				}

				res.json().then(function(data) {
					console.log(data);
					chrome.tabs.sendMessage(tab.id, {data: data.data});
				});
			});
		}
	}
});
