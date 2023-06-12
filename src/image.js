import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '37205092-ee8b3a91029812b1435501f30';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(q, page) {
    try {
        const {data} = await axios({
            params: {
                key: API_KEY,
                q,
                image_type : 'photo',
                orientation : 'horizontal',
                safesearch : true,
                page,
                per_page : 40,
            }
        })
    return data;
    }catch(error){
        Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
        );
    }
}


export { fetchImages };