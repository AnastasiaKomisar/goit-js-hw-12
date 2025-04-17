import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a");

export const createGallery = (images) => {
  const galleryContainer = document.querySelector(".gallery");

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("gallery-temp");

  const markup = images
    .map(
      (image) => 
        `<li>
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="info">
            <p><span>Likes</span><br> ${image.likes}</p>
            <p><span>Views</span><br> ${image.views}</p>
            <p><span>Comments</span><br> ${image.comments}</p>
            <p><span>Downloads</span><br> ${image.downloads}</p>
          </div>
        </li>`
    )
    .join("");

  tempDiv.innerHTML = markup;

  const imagesElements = tempDiv.querySelectorAll("img");
  const loadPromises = Array.from(imagesElements).map(
    (img) =>
      new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      })
  );

  Promise.all(loadPromises)
    .then(() => {
      galleryContainer.insertAdjacentHTML("beforeend", markup);
      lightbox.refresh();
      hideSearchLoader();
      hideLoadMoreLoader(); 
      showLoadMoreButton();
    })
    .catch((error) => {
      console.error("Image loading failed:", error);
      hideSearchLoader();
      hideLoadMoreLoader(); 
    });
};

export const clearGallery = () => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";
};

export const showSearchLoader = () => {
  const loader = document.querySelector(".search-loader");
  loader.classList.add("show");
};

export const hideSearchLoader = () => {
  const loader = document.querySelector(".search-loader");
  loader.classList.remove("show");
};

export const showLoadMoreLoader = () => {
  const loader = document.querySelector(".load-more-loader");
  loader.classList.add("show");
};

export const hideLoadMoreLoader = () => {
  const loader = document.querySelector(".load-more-loader");
  loader.classList.remove("show");
};

export const showLoadMoreButton = () => {
  const loadMoreButton = document.querySelector(".load-more");
  loadMoreButton.classList.remove("hidden");
};

export const hideLoadMoreButton = () => {
  const loadMoreButton = document.querySelector(".load-more");
  loadMoreButton.classList.add("hidden");
};
