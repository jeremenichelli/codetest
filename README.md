codetest
========

Sample code using Etsy Search API.

To simplify cross domain AJAX call and animations, jQuery was used.

KnockoutJS was included to improve UI changes performance, saving search results changes in an observableArray ko object. After the search results are shown a toolbar appears and allows the user to sort the results by price or name and navigate through the different pages of results.

A hash state is pushed on every search and result page change so it can be saved in the user's bookmarks bar. Every time a page with a search query is opened and after all the web has been loaded an AJAX call is executed to show the results.

Each result can be removed (though this change is not saved for later sessions after the page is saved and closed), there's a link to the product page, and a View description button to expand a text with more details about the product. The Add to cart button is not functional.

This page has been tested in Chrome, Firefox and IE9+.
