import $ from 'jquery';
import view from './views';
import store from './store';
import api from './api';

function getItemIdFromElement(item) {
  return $(item).closest('.bookmark-links').data('item-id');
}
function handleExpand() {
  $('.bookmark-app-start').on('click', '.bookmark-links-btn', (event) => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const bookmarkItem = store.findId(id);
    store.toggleViews(bookmarkItem);
    view.renderBookmark();
  });
}

function addNewBookmark() {
  const title = $('.bookmark-title').val();
  const url = $('.bookmark-url').val();
  const desc = $('.bookmark-description').val();
  const rating = $('.bookmark-rating:checked').val();
  const item = { title, url, desc, rating };
  api
    .createItem(item)
    .then((newItem) => {
      store.addBookmark(newItem);
      view.renderBookmark();
    })
    .catch((error) => {
      store.setError(error.message);
      view.renderError();
    });
}
function handleNewItemSubmit() {
  $('.bookmark-app-start').on('submit', '.add-bookmark', (event) => {
    event.preventDefault();
    store.adding = false;
    addNewBookmark();
  });
}
function handleNewForm() {
  $('.bookmark-app-start').on('click', '.new-form', (event) => {
    event.preventDefault();
    store.adding = true;
    view.renderBookmark();
  });
}
function handleDeleteItemClicked() {
  $('.bookmark-app-start').on('click', '.delete-bookmark', (event) => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api
      .deleteItem(id)
      .then(() => {
        store.deleteBookmark(id);
        view.renderBookmark();
      })
      .catch((error) => {
        store.setError(error.message);
        view.renderError();
      });
  });
}
function handleFilter() {
  $('.bookmark-app-start').on('change', '.bookmark-selection', (event) => {
    const rating = $('option:checked').val();
    const filteredBookmarks = store.filterRating(rating);
    view.filteredRender(filteredBookmarks);
  });
}

function eventListeners() {
  handleNewForm();
  handleNewItemSubmit();
  handleDeleteItemClicked();
  handleExpand();
  handleFilter();
}
export default {
  eventListeners,
};
