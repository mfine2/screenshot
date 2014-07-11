var timer = null;

var allowUrl = "baidu.com";
var interval = 300;

chrome.browserAction.onClicked.addListener(function(tab) {
    takeScreenshot();
});

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    takeScreenshot();
});

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        takeScreenshot();
    });
});
*/

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab){
        clearInterval(timer);
        chrome.tabs.onUpdated.removeListener(onUpdatedFn);

        var onUpdatedFn = function(tabId, changeInfo, tabUpdated) {
            if (tabId !== tab.id || changeInfo.status !== "complete") {
                return;
            }

            clearInterval(timer);

            if(tabUpdated.url.indexOf(allowUrl) !== -1) {
                timer = setInterval(function(){
                    console.log("tab udpated: " + tabUpdated.url);
                    takeScreenshot();
                }, interval);
            }
        }

        if(tab.url.indexOf(allowUrl) !== -1) {
            timer = setInterval(function(){
                console.log("tab actived: " + tab.url);
                takeScreenshot();
            }, interval);
            chrome.tabs.onUpdated.addListener(onUpdatedFn);
        }
    });
});
