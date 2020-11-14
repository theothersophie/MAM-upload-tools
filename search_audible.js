// ==UserScript==
// @name         MAM Search Audible Button
// @namespace    https://github.com/theothersophie/MAM-search-audio/blob/main/search_audible.js
// @version      0.1
// @description  Add a search audible button on the MAM upload page.
// @author       theothersophie
// @match        https://www.myanonamouse.net/tor/upload.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var f = document.getElementById("fillJson");
    var s = document.createElement("button");
    var searchUrl = "https://www.audible.com/search?keywords=";
    var nodeTorrName = document.querySelectorAll('[name="tor[torrentName]"')[0];

    var torrName = nodeTorrName.value;
    /* Remove the .torrent and all non alphanumeric characters except spaces and replace all whitespace with + */
    torrName = torrName.replace(/\.torrent/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "+");
    searchUrl += torrName;

    s.setAttribute("id", "searchAudible");
    s.setAttribute("onclick", "parent.open('" + searchUrl + "')");
    s.innerHTML = "Search on Audible.com";
    f.insertAdjacentElement("afterend", s);
})();
