import { contGall } from './index';

function galleryRender(photos) {
    const markup = photos
    .map((
        {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) =>{
            return `<a class="link-card" href="${largeImageURL}">
            <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Like</b>"${likes}"
              </p>
              <p class="info-item">
                <b>Views</b>"${views}"
              </p>
              <p class="info-item">
                <b>Comments</b>"${comments}"
              </p>
              <p class="info-item">
                <b>Downloads</b>"${downloads}"
              </p>
            </div>
          </div>`
        }
    )
    .join('');
    contGall.insertAdjacentHTML('beforeend', markup);
};

export { galleryRender };