import $ from 'jquery';
import store from './store';

function generateIntialView() {
  return `
  <form>
  <fieldset class="bookmark-selection">
      <select aria-label="filter rating" >
        <option selected disabled hidden>Filter By Rating</option>
        <option value="5">☆☆☆☆☆</option>
        <option value="4">☆☆☆☆</option>
        <option value="3">☆☆☆</option>
        <option value="2">☆☆</option>
        <option value="1">☆</option>
      </select>
      <button type="submit" class="new-form">Add</button>
      </fieldset></form>
  <h2 class="bookmark-header">Bookmarks</h2><ul class="bookmark-list">`;
}
function generateBookmark(bookmarks) {
  if (!bookmarks.expanded) {
    return `
        <li class="bookmark-links" data-item-id="${bookmarks.id}">
          <button class="bookmark-links-btn">${bookmarks.title}</button
          ><p class="star-rating">${bookmarks.rating}☆</p><button type='submit' class='delete-bookmark'>Delete</button>
        </li>`;
  } else {
    return `
    <li class="bookmark-links" data-item-id="${bookmarks.id}">
  <button class="bookmark-links-btn">${bookmarks.title}</button>
  <p class="star-rating">${bookmarks.rating}☆</p>
  <p class="description-expanded">${bookmarks.desc}</p>
  <p><a class="site-link" href="${bookmarks.url}">Visit Site</a></p>
  <button type='submit' class='delete-bookmark'>Delete</button></li>`;
  }
}
function generateBookmarkString(bookmarkItem) {
  const items = bookmarkItem.map((item) => generateBookmark(item));
  return items.join('');
}

function generateAddBookmark() {
  let addView = `
  <form class="add-bookmark">
      <p><input
        type="text"
        placeholder="Title" class="bookmark-title"
      aria-label="title" required/></p>
      <p><input type="text" placeholder="Your link here" class="bookmark-url" aria-label="url" required/></p>
      <p>
      <input
        id="star1"
        name="bookmark-rating"
        type="radio"
        value="1"
        class="bookmark-rating" 
        aria-label="rating" >1☆</input>
      <input
        id="star2"
        name="bookmark-rating"
        type="radio"
        value="2"
        class="bookmark-rating" 
        aria-label="rating"
      >2☆</input>
      <input
        id="star3"
        name="bookmark-rating"
        type="radio"
        value="3"
        class="bookmark-rating" 
        aria-label="rating"
      >3☆</input>
      <input
        id="star4"
        name="bookmark-rating"
        type="radio"
        value="4"
        class="bookmark-rating" 
        aria-label="rating"
      >4☆</input>
      <input
        id="star5"
        name="bookmark-rating"
        type="radio"
        value="5"
        class="bookmark-rating" 
        aria-label="rating"
      >5☆</input></p>
      <div class="clear"></div>
      <p><textarea
        class="bookmark-description"
        placeholder="Add description here"
        maxlength="100"
        aria-label="description"
      /></p>
      <button type="submit" class="add-bookmark-item" aria-label="add btn">Add</button></form>
    `;
  $('.bookmark-app-start').html(addView);
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
  generateAddBookmark,
  generateBookmarkString,
  filteredRender,
};
