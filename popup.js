function input_change(event) {
    var text = event.currentTarget.value;
    // WARN: popup console.log is not displayed
    // console.log(text);

    let e = event;
    if (event.keyCode === 13) {
        exit();
    }

    // send text to script.js
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            JSON.stringify({
                text: text,
            }),
            function(response) {});
    });

}

function exit() {
    window.close();
}

let text = document.getElementById('textbox');
text.addEventListener('keypress', input_change);
