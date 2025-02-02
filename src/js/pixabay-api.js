import axios from 'axios';


export const fetchPhotosByQuery = (searchedEl, currentPage) => {
  const searchParams = new URLSearchParams({
    q: searchedEl,
    key: '48586897-e2ee4ea242ed1cc66f698b76b',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 21,
  });

  return axios.get(`https://pixabay.com/api/?${searchParams}`, searchParams);
};
