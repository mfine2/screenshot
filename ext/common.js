var prevDateUrl = "";

function sendDataUrl(dataUrl) {
    if(dataUrl === prevDateUrl) {
        return;
    } else {
        prevDateUrl = dataUrl;
    }


    var url = "http://slc07fsi.us.oracle.com:8090/setDataUrl/";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            } else {
                console.log("dataUrl send failed");
            }
        }
    };

    xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //why not work?
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({dataUrl: dataUrl}));
}

function takeScreenshot () {
    chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
        sendDataUrl(dataUrl);
    });
}
