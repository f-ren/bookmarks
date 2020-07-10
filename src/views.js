import $ from 'jquery';
import store from './store';

function generateIntialView() {
  return `
  <form>
  <fieldset class="bookmark-selection">
  <label>Filter Bookmarks:</label>
      <select aria-label="filter rating" >
        <option selected disabled hidden>Ratings:</option>
        <option value="5">☆☆☆☆☆</option>
        <option value="4">☆☆☆☆</option>
        <option value="3">☆☆☆</option>
        <option value="2">☆☆</option>
        <option value="1">☆</option>
      </select>
      <button class="new-form">Add New Bookmark</button>
      </fieldset>
  </form>
  <h2 class="bookmark-header">Bookmarks</h2>
  <div class="error"></div>`;
}
function generateBookmark(bookmarks) {
  if (!bookmarks.expanded) {
    return `
        <li class="bookmark-links" data-item-id="${bookmarks.id}">
          <button class="bookmark-links-btn">${bookmarks.title}</button
          ><p class="star-rating">${bookmarks.rating}☆</p><button class='delete-bookmark'>Delete</button>
        </li>`;
  } else {
    return `
    <li class="bookmark-links" data-item-id="${bookmarks.id}">
  <button class="bookmark-links-btn">${bookmarks.title}</button>
  <p class="star-rating">${bookmarks.rating}☆</p>
  <p class="description-expanded">${bookmarks.desc}</p>
  <p><a class="site-link" href="${bookmarks.url}">Visit Site</a></p>
  <button class='delete-bookmark'>Delete</button></li>`;
  }
}
function generateBookmarkString(bookmarkItem) {
  const items = bookmarkItem.map((item) => generateBookmark(item));
  return '<ul class="bookmark-list">' + items.join('') + '</ul>';
}

function generateAddBookmark() {
  let addView = `
  <div class="error"></div>
  <form class="add-bookmark">
    <p>
      <input type="text"placeholder="Title" class="bookmark-title"
      aria-label="title" required/>
    </p>
    <p>
      <input type="text" placeholder="Your link here" class="bookmark-url" aria-label="url" required/>
    </p>
    <p>
      <input
        id="star1"
        name="bookmark-rating"
        type="radio"
        value="1"
        class="bookmark-rating" 
        aria-label="1 star rating" required/>
        <label for="star1">1☆</label>
      <input
        id="star2"
        name="bookmark-rating"
        type="radio"
        value="2"
        class="bookmark-rating" 
        aria-label="2 star rating"
      >
      <label for="star2">2☆</label>
      <input
        id="star3"
        name="bookmark-rating"
        type="radio"
        value="3"
        class="bookmark-rating" 
        aria-label="3 star rating"
      >
      <label for="star3">3☆</label>
      <input
        id="star4"
        name="bookmark-rating"
        type="radio"
        value="4"
        class="bookmark-rating" 
        aria-label="4 star rating"
      >
      <label for="star4">4☆</label>
      <input
        id="star5"
        name="bookmark-rating"
        type="radio"
        value="5"
        class="bookmark-rating" 
        aria-label="5 star rating"
      >
      <label for="star5">5☆</label>
    </p>
      <div class="clear"></div>
      <p><textarea
        class="bookmark-description"
        placeholder="Add description here"
        maxlength="100"
        aria-label="description"
        required
      /></p>
      <button type="submit" class="add-bookmark-item" aria-label="add btn">Add</button></form>
    `;
  $('.bookmark-app-start').html(addView);
}
function generateError(error) {
  console.log(error);
  return `<p class="err">${error}</p>`;
}
function renderError() {
  if (store.error) {
    let err = generateError(store.error);
    $('.error').html(err);
  }
}
function renderBookmark() {
  if (!store.adding) {
    let bookmarkItems = [...store.bookmark];
    let string = generateIntialView() + generateBookmarkString(bookmarkItems);
    $('.bookmark-app-start').html(string);
  } else {
    generateAddBookmark();
  }
}
function filteredRender(filteredBookmarks) {
  if (!store.adding) {
    let string =
      generateIntialView() + generateBookmarkString(filteredBookmarks);
    $('.bookmark-app-start').html(string);
  } else {
    generateAddBookmark();
  }
}

export default {
  renderBookmark,
  renderError,
  generateAddBookmark,
  generateBookmarkString,
  filteredRender,
};
