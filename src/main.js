import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showSearchLoader,
  showLoadMoreLoader,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");
const loadMoreButton = document.querySelector(".load-more");

let currentPage = 1;
let currentQuery = '';

const fetchImages = async (query, page) => {
  try {
    const data = await getImagesByQuery(query, page);

    if (!data || !Array.isArray(data.hits)) {
      throw new Error("Invalid API response structure");
    }

    return data;

  } catch (error) {
    iziToast.error({
      title: "",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
      backgroundColor: "#EF4040",
      messageColor: "#FAFAFB",
    });

    return { hits: [], totalHits: 0 };
  }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
        title: "Oops!",
        message: "Please enter a search term!",
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;

    clearGallery();
    hideLoadMoreButton();
    showSearchLoader();

    const imagesData = await fetchImages(query, currentPage);

    if (imagesData.hits.length > 0) {
        createGallery(imagesData.hits);
    } else {
        hideLoadMoreButton();
        iziToast.warning({
            title: "",
            message: "Sorry, there are no images matching your search query. Please try again!",
        });
    }
});

loadMoreButton.addEventListener("click", async () => {
    currentPage += 1;
    showLoadMoreLoader();

    const imagesData = await fetchImages(currentQuery, currentPage);

    if (imagesData.hits.length > 0) {
        createGallery(imagesData.hits);
        scrollPage();
    }

    const totalHits = imagesData.totalHits;
    const per_page = 15;

    if (currentPage * per_page >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
        title: "",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        backgroundColor: "#4E75FF",
        messageColor: "#FAFAFB",
        });
    }
});

const scrollPage = () => {
    const galleryItemHeight = document.querySelector(".gallery li").getBoundingClientRect().height;
    window.scrollBy({
        top: galleryItemHeight * 2,
        behavior: "smooth",
    });
};

