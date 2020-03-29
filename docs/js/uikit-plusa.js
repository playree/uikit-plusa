document.addEventListener('DOMContentLoaded', function () {
    ukpReady();
});

function ukpReady() {
    document.addEventListener("change", function(event) {
        if(event.target.tagName == "INPUT") {
            if(event.target.parentElement.classList.contains("ukp-input-field")) {
                if(event.target.value == "") {
                    event.target.removeAttribute("ukp-active");
                } else {
                    event.target.setAttribute("ukp-active", "");
                }
            }
        }
    }, false);
    [].forEach.call(document.getElementsByTagName("INPUT"), function(el) {
        if(el.parentElement.classList.contains("ukp-input-field")) {
            if(el.value != "") {
                el.setAttribute("ukp-active", "");
            }
        }
    });
}
