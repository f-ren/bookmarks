// Add bookmarks to list containing: id, title, url, rating, description
// See list of bookmarks when first opening display only title and rating
// Display more details when click on a bookmark, display a visit site button --- toggling
// Remove bookmarks from list
//Give feedback when a bookmark cant be added (title and url required)
//Select a filter dropdown for minimum rating

let bookmark = [];
let adding = false;
let error = null;
let filter = 0;

function findId(id) {
  return this.bookmark.find((currentItem) => currentItem.id === id);
}

function addBookmark(newItem) {
  newItem.expanded = false;
  this.bookmark.push(newItem);
}

function deleteBookmark(id) {
  this.bookmark = this.bookmark.filter(
    (currentBookmark) => currentBookmark.id !== id
  );
}

function toggleViews(bookmarkItem) {
  bookmarkItem.expanded = !bookmarkItem.expanded;
}

function filterRating(value) {
  this.filter = value;
  const filteredBookmarks = bookmark.filter(
    (bookmarkItem) => bookmarkItem.rating >= this.filter
  );
  return filteredBookmarks;
}
function setError(error) {
  this.error = error;
}
export default {
  bookmark,
  adding,
  error,
  filter,
  addBookmark,
  deleteBookmark,
  findId,
  toggleViews,
  filterRating,
  setError,
};
