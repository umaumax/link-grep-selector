let marks;
let mark_index = 0;

function focus_mark(element) {
    scroll_to_element(element);
    // forcus to parent a tag
    element.parent().focus();
}

function scroll_to_element(element) {
    console.log('element', element);
    console.log('offset', element.offset());

    let height = $(window).height();
    let offset = height / 3;
    let duration = 500;
    $([document.documentElement, document.body]).animate({
        scrollTop: element.offset().top - offset
    }, duration);
}

$(function() {
    // from popup.js
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        let request_obj = JSON.parse(request);
        let text = request_obj.text;

        $("a").unmark();
        $("a").mark(text);
        marks = $("mark");
        mark_index = 0;

        if (marks.length != 0) {
            let first_mark = marks.first();
            if (first_mark) {
                focus_mark(first_mark);
            }
        }
        return true;
    });

    // WARN: if popup.html has focus, below event is not fired
    window.addEventListener('keydown', function(event) {
        console.log('keydown', event);
        // ctrl + n, alt + n
        if (event.keyCode == 78 && (event.ctrlKey || event.altKey)) {
            let mark_length = marks.length;
            if (mark_length != 0) {
                mark_index++;
                mark_index %= mark_length;
                let target_mark = marks.eq(mark_index);
                if (target_mark) {
                    focus_mark(target_mark);
                }
            }
        }
        // ctrl + p, alt + p
        if (event.keyCode == 80 && (event.ctrlKey || event.altKey)) {
            let mark_length = marks.length;
            if (mark_length != 0) {
                mark_index += mark_length - 1;
                mark_index %= mark_length;
                let target_mark = marks.eq(mark_index);
                if (target_mark) {
                    focus_mark(target_mark);
                }
            }
        }
    }, true);
});
