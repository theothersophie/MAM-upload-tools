function copy(txt) {
    var e = document.createElement("input");
    e.type = "text";
    e.value = txt;
    e.setAttribute("style", "position:fixed;top:0;left:0;height:100%;width:100%;z-index:9");
    e.setAttribute("onclick", "copyHelper(this);");
    document.body.appendChild(e);
}
function copyHelper(e) {
    e.select();
    e.setSelectionRange(0, e.value.length);
    document.execCommand("copy");
    document.body.removeChild(e);
}
var authorElements = document.querySelectorAll(".authorLabel a");
var authors = [];
for (let index = 0; index < authorElements.length; index++) {
    authors[index] = authorElements[index].innerHTML;
}

var narratorElements = document.querySelectorAll(".narratorLabel a");
var narrators = [];
for (let index = 0; index < narratorElements.length; index++) {
    narrators[index] = narratorElements[index].innerHTML;
}

var runtime = document.querySelector(".runtimeLabel").textContent;
/* clean up unnecessary parts of string */
var patt = new RegExp("Length:\n\\s+(\\d[^\n]+)");
var matches = patt.exec(runtime);
/* The first capture group contains the actual runtime */
runtime = matches[1];

var title = document.getElementsByTagName("h1")[0].innerText;
var sLoggedOut = document.querySelector("span.bc-size-medium");
var sLoggedIn = document.querySelector(".subtitle");
var subtitle = "";
if (sLoggedIn) {
    subtitle = sLoggedIn.innerText;
}
else if (sLoggedOut) {
    subtitle = sLoggedOut.innerText;
}
if (subtitle) {
    title = title + ": " + subtitle;
}

var cOut = document.querySelector(".categoriesLabel");
var cIn = document.querySelector("nav.bc-breadcrumb");
var c;

if (cOut) {
    c = cOut;
}
else if (cIn) {
    c = cIn;
}

var categories = c.innerText;

var b = document.querySelector(".bc-image-inset-border").src;
var d = document.querySelector(".productPublisherSummary>div>div>span").innerHTML;
/* In order: Remove excess whitespace, replace double quotes, add line break after every paragraph, and every list */
d = d.replace(/\s+/g, " ").replace(/"/g, '\\"').replace(/<\/p>/g,"</p><br>").replace(/<\/ul>/g, "</ul><br>");

var tags = "Duration: " + runtime + ", inAudible True Decrypt, " + categories;

var json = {
    "authors" : authors,
    "description": d,
    "narrators": narrators,
    "tags": tags,
    "thumbnail": b,
    "title": title
};

var strJson = JSON.stringify(json);

copy(strJson);
