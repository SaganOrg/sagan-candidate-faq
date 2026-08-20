/* Sagan Candidate FAQ — progressive enhancement only.
   With JavaScript disabled the page is still a complete, readable FAQ. */

(function () {
  "use strict";

  var items = Array.prototype.slice.call(document.querySelectorAll(".faq__list details"));
  if (!items.length) return;

  /* --- Deep links -------------------------------------------------------
     Support can send a candidate straight to one answer, e.g.
     https://example.com/#attempts-used                                   */

  function openFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.tagName.toLowerCase() === "details") {
      target.open = true;
      target.scrollIntoView({ block: "center" });
    }
  }

  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  /* Keep the address bar in step, so copying the URL shares the open answer. */
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      syncToggleAll();
      if (!item.open || !item.id || !window.history.replaceState) return;
      window.history.replaceState(null, "", "#" + item.id);
    });
  });

  /* --- Expand all / Collapse all ---------------------------------------- */

  var button = document.querySelector(".toggle-all");

  function syncToggleAll() {
    if (!button) return;
    var allOpen = items.every(function (item) { return item.open; });
    button.dataset.expanded = String(allOpen);
    button.textContent = allOpen ? "Collapse all" : "Expand all";
  }

  if (button) {
    button.addEventListener("click", function () {
      var expand = button.dataset.expanded !== "true";
      items.forEach(function (item) { item.open = expand; });
      syncToggleAll();
    });
    syncToggleAll();
  }

  /* --- Print ------------------------------------------------------------
     A closed <details> prints as a bare question, so open everything for
     the print job and put it back afterwards.                             */

  var beforePrint = [];

  function expandForPrint() {
    beforePrint = items.map(function (item) { return item.open; });
    items.forEach(function (item) { item.open = true; });
  }

  function restoreAfterPrint() {
    items.forEach(function (item, i) { item.open = beforePrint[i]; });
    syncToggleAll();
  }

  window.addEventListener("beforeprint", expandForPrint);
  window.addEventListener("afterprint", restoreAfterPrint);
})();
