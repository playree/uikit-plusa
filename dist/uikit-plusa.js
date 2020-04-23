/*! UIkit Plus α 1.0.3 | https://playree.github.io/uikit-plusa/ | (c) 2020 Kazuki Minakawa (funlab, Inc.) | MIT License */

document.addEventListener('DOMContentLoaded', () => {
    ukpReady();
});

function ukpReady() {
    document.addEventListener("change", (event) => {
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
    [].forEach.call(document.getElementsByTagName("INPUT"), (el) => {
        if(el.parentElement.classList.contains("ukp-input-field")) {
            if(el.value != "") {
                el.setAttribute("ukp-active", "");
            }
        }
    });
}

class UkpInfiniteScroll {
    constructor(targetElt, loadingElt, onLoad) {
        this.loadingElt = document.getElementById(loadingElt);
        this.onLoad = onLoad;
        this.scTimerId = null;
        this.scCount = 0;
        this.isLoading = false;
        this.isFinish = false;

        if (targetElt == null) {
            this.targetEvt = document;
            this.targetElt = document.documentElement;
        } else {
            this.targetEvt = this.targetElt = document.getElementById(targetElt);
        }

        this._reload();

        this.targetEvt.addEventListener('scroll', () => {
            if (this.isFinish) {
                return;
            }
            if (this.scTimerId != null) {
                clearTimeout(this.scTimerId);
            }
            this.scTimerId = setTimeout( () => {
                if (this.targetElt.scrollHeight <= (this.targetElt.clientHeight + this.targetElt.scrollTop + 4)) {
                    this._reload();
                }
            }, 200);
        }, false);
    }

    _reload() {
        if (!this.isLoading) {
            this.isLoading = true;

            this.loadingElt.removeAttribute('hidden');
            this.targetElt.scrollTop = this.targetElt.scrollHeight;
            this.onLoad(this, this.scCount++);
        }
    }

    add(item) {
        this.loadingElt.insertAdjacentHTML('beforebegin', item);
    }

    comp() {
        if (this.targetElt.scrollHeight == this.targetElt.clientHeight) {
            setTimeout(() => {
                this.onLoad(this, this.scCount++);
            }, 10);
        } else {
            this.isLoading = false;
            this.loadingElt.setAttribute('hidden', null);
        }
    }

    finish() {
        this.isLoading = false;
        this.isFinish = true;
        this.loadingElt.setAttribute('hidden', null);
    }
}