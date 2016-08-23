

function init() {
	// form chrome.tabs.query
	var q = {active: true, currentWindow: true};
	chrome.tabs.query(q, function(tabs) {
		var currentTab = tabs[0];
		checkUrl(currentTab.url);
	});
}

function checkUrl(url) {
	if(url.indexOf("youtube.com") == -1) {
		// not in YouTube
		writeError("you're not in YouTube");
	} else {
		var youtubeVideoId = getUrlParameter('v', url);
		if(youtubeVideoId)  {
			writeSuccess(youtubeVideoId);
		} else {
			writeError("you're not watching a video");
		}
	}
}

function getUrlParameter(param, url) {
	if(!url) return null;
	param = param.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(url);
	if(!results) return null;
	if(!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function writeError(msg) {
	var mainDiv = document.getElementById('main-div');
	
	var title = document.createElement("h3");
	title.appendChild(document.createTextNode("Sorry"));
	var errMsg = document.createElement("p");
	errMsg.appendChild(document.createTextNode(msg));

	mainDiv.appendChild(title);
	mainDiv.appendChild(errMsg);
}

function writeSuccess(youtubeVideoId) {
	var mainDiv = document.getElementById('main-div');

	var arrow_down = document.createElement("p");
	arrow_down.appendChild(document.createTextNode("↓↓↓"));

	var img = document.createElement("img");
	img.src = "icon.png";
	img.id = "mixerbox-link-image";
	img.setAttribute("class", "responsive-img");
	img.style.cursor = "pointer";

	mainDiv.appendChild(arrow_down);
	mainDiv.appendChild(img);
	document.getElementById('mixerbox-link-image').addEventListener('click', function(e) {
		// clicked
		// create new tab
		chrome.tabs.create({url: "http://www.mixerbox.com/music/0/" + youtubeVideoId}, null);
	});
}

$(document).ready(function() {
	init();
});
