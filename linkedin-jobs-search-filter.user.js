// ==UserScript==
// @name         linkedin-jobs-search-filter
// @namespace    https://github.com/dadanyet/linkedin-jobs-search-filter
// @version      0.1
// @description  Filter out spammy search results by CompanyName from Linkedin Jobs
// @author       dadanyet
// @match        *://www.linkedin.com/jobs/search/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
// *** To use, simply edit blacklist array ***
// Yes, it's ugly. I don't care for WebDev.

(function() {
    'use strict';
    // Your code here...
    const blacklist = ['The Job Network', 'CodeForce 360']; // these two entries account for 1/4 of local results in my area
    const config = { childList: true, subtree: true };

    var targetNode = document.querySelector('ul.jobs-search-results__list.artdeco-list');
    if (targetNode == null) { targetNode = document; }
    var count = 0;
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.target.className == 'occludable-update artdeco-list__item--offset-4 artdeco-list__item p0 ember-view') {
                var el = mutation.target.querySelector('.job-card-search__company-name-link.t-normal.ember-view');
                if (el == null) { continue; }
                for (let black of blacklist) {
                    if (el.innerText == black) {
                        for (let i = 0; el != null && i < 4; ++i) { el = el.parentNode; }
                        el.remove(); //mutation.target.remove();
                        //console.log(++count + " listings removed");
                        break;
                    }
                }
            }
        }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
