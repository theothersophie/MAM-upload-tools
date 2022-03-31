function copy(txt) {
    var e = document.createElement("input");
    e.type = "text";
    e.value = txt;
    e.setAttribute(
        "style",
        "position:fixed;top:0;left:0;height:100%;width:100%;z-index:9"
    );
    e.setAttribute("onclick", "copyHelper(this);");
    document.body.appendChild(e);
}

function copyHelper(e) {
    e.select();
    e.setSelectionRange(0, e.value.length);
    document.execCommand("copy");
    document.body.removeChild(e);
}

function getSeriesName() {
    let series = "";
    let seriesElement = document.querySelector(".seriesLabel");
    if (seriesElement) {
        series = seriesElement.querySelector("a").innerHTML;
    }
    return series;
}

function getSeriesBookNumber() {
    let bookNumber = "";
    if (!getSeriesName()) {
        return "";
    }
    let seriesElement = document.querySelector(".seriesLabel");
    let patt = /Book\s*?(\d+\.?\d*-?\d*\.?\d*)/g;
    bookNumber = patt.exec(seriesElement.innerHTML);

    if (!bookNumber) {
        return "";
    }
    return bookNumber[1];
}

function getLanguage() {
    let languageElement = document.querySelector(".languageLabel");
    let patt = /\s*(\w+)$/g;
    matches = patt.exec(languageElement.innerHTML.trim());
    return matches[1];
}

var authorElements = document.querySelectorAll(".authorLabel a");
var authors = [];
for (let index = 0; index < authorElements.length; index++) {
    authors[index] = authorElements[index].innerHTML.replace(
        / - (foreword|afterword|translator|editor)/gi,
        ""
    );
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
} else if (sLoggedOut) {
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
} else if (cIn) {
    c = cIn;
}
var categories;
if (c) {
    categories = c.innerText;
} else {
    categories = "";
}
var b = document.querySelector(".bc-image-inset-border").src;
var d = document.querySelector(
    ".productPublisherSummary>div>div>span"
).innerHTML;
/* In order: Remove excess whitespace, replace double quotes, remove empty p elements, add line break after every paragraph, and every list */ d =
    d
        .replace(/\s+/g, " ")
        .replace(/"/g, '\\"')
        .replace(/<p><\/p>/g, "")
        .replace(/<\/p>/g, "</p><br>")
        .replace(/<\/ul>/g, "</ul><br>");
var tags =
    "Duration: " +
    runtime +
    " | Chapterized | Libation True Decrypt | " +
    categories;

var json = {
    authors: authors,
    description: d,
    narrators: narrators,
    tags: tags,
    thumbnail: b,
    title: title,
    language: getLanguage(),
};

let seriesName = getSeriesName();
if (seriesName) {
    let bookNumber = getSeriesBookNumber();
    json["series"] = [{ name: seriesName, number: bookNumber }];
}

var strJson = JSON.stringify(json);
copy(strJson);
