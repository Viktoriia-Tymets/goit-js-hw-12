import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';


const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let imgBox = '';
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery');

let page = 1;
let searchedEl = '';
let perPage = 21;

loadMoreBtn.classList.add('is-hidden');

const searchSubmit = async event => {
  try {
    event.preventDefault();

    searchedEl = searchForm.elements[0].value.trim();

    if (searchedEl === '') {
      iziToast.error({
        title: '',
        message: 'Please enter your request',
        position: 'topRight',
      });

      return;
    }

    page = 1;

    loadMoreBtn.classList.add('is-hidden');
    loader.classList.add('show-loader');

    const { data } = await fetchPhotosByQuery(searchedEl, page);

    if (data.total === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      gallery.innerHTML = '';

      searchForm.reset();

      return;
    }

    if (data.totalHits > 1) {
      loadMoreBtn.classList.remove('is-hidden');

      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }

    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    gallery.innerHTML = galleryTemplate;
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    loader.classList.remove('show-loader');
  }
};

searchForm.addEventListener('submit', searchSubmit);

const onLoadMoreBtnClick = async event => {
  try {
    const endMessage = document.querySelector('.endResults');
    loader.classList.add('show-loader');

    page += 1;

    const { data } = await fetchPhotosByQuery(searchedEl, page);

    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    gallery.insertAdjacentHTML('beforeend', galleryTemplate);
    loader.classList.remove('show-loader');

    imgBox = document.querySelector('.gallery-card').getBoundingClientRect();
    let imgHeight = imgBox.height;

    window.scrollBy({
      top: imgHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.show({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'red',
      });

      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.log(err);
  }
};












