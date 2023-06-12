import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './image';
import { galleryRender } from './gallery';



const form = document.querySelector('#search-form');
const contGall = document.querySelector('.gallery')
const guard = document.querySelector('.guard')


form.addEventListener('submit', handleSubmit);

let pageFetch
let queryFetch = '';

const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          getImages(queryFetch, pageFetch);
        }
      });
    },
    { rootMargin: '200px' }
  );

  const gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  async function getImages(query, page) {
    try {
      const data = await fetchImages(query, page);
  
      if (!data.totalHits) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }
  
      const photos = data.hits;
      galleryRender(photos);
  
      if (pageFetch === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
  
      const totalPagesPerSubmit = Math.ceil(data.totalHits / 40);
  
      if (pageFetch === totalPagesPerSubmit) {
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        observer.unobserve(guard);
        return;
      }
  
      pageFetch += 1;
      observer.observe(guard);
  
      gallery.refresh();
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        `Ooops... Something goes wrong. Please, try again.`
      );
    }
  }
  
function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.elements.searchQuery.value;
  
    if (!inputValue.trim() || inputValue === queryFetch) {
      return;
    }
  
    queryFetch = inputValue;
    pageFetch = 1;
    contGall.innerHTML = '';
  
    //знимаємо старий observer при новому запиті
    observer.unobserve(guard);
  
    getImages(queryFetch, pageFetch);
    form.reset();
  }
  
  export { contGall };