const APIKEY = '78966716185644378e096e0b57c0726a';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButton");

async function fetchRandomNews() {
    try {
        const apiURL = `https://newsapi.org/v2/everything?q=sport&pageSize=6&sortBy=popularity&language=en&apiKey=${APIKEY}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}


searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=6&apiKey=${APIKEY}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

async function displayBlogs(articles) {
    try {
        blogContainer.innerHTML = "";
        articles.forEach((article) => {
            const blogcard = document.createElement("div");
            blogcard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;

            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "......" : article.title;
            title.textContent = truncatedTitle;

            const description = document.createElement("p");
            const truncatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "......" : article.description;
            description.textContent = truncatedDescription;

            blogcard.appendChild(img);
            blogcard.appendChild(title);
            blogcard.appendChild(description);
            blogcard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            blogContainer.appendChild(blogcard);
        });
    } catch (error) {
        console.error("Error displaying news", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying initial news", error);
    }
});
