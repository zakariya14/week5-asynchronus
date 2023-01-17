// fetch()
async function viewBody() {
  try {
    const newsBody = await getNewsBody();
    updateNewsBody(newsBody);
  } catch (e) {
    alert(e);
  } finally {
    this.innerHTML = `Loading...`;
  }
}
viewBody();

function getNewsBody() {
  return fetch("https://newsapi.org/v2/top-headlines?" + "country=id&" + "apiKey=e28f168fa9164607bfb2f0a0324d9900")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.articles;
    });
}

function updateNewsBody(newsBody) {
  let cards = "";
  newsBody.forEach((n) => (cards += showCards(n)));
  const containerNews = document.querySelector(".container-news");
  containerNews.innerHTML = cards;
}

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  this.innerHTML = "Loading...";
  try {
    const keywordIn = document.querySelector(".keyword-in");
    const news = await getNews(keywordIn.value);
    updateNews(news);
  } catch (e) {
    alert(e);
  } finally {
    this.innerHTML = `Search`;
  }
});

function getNews(keyword) {
  return fetch("https://newsapi.org/v2/everything?" + "q=" + keyword + "&" + "apiKey=e28f168fa9164607bfb2f0a0324d9900")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.articles;
    });
}

function updateNews(news) {
  let cards = "";
  news.forEach((n) => (cards += showCards(n)));
  const containerNews = document.querySelector(".container-news");
  containerNews.innerHTML = cards;
}

function showCards(n) {
  return ` <div class="col-md-3">
  <div class="card mt-4">
    <img src="${n.urlToImage}" class="img-fluid rounded-top" />
    <div class="card-body">
      <h4 class="card-title">${n.title}</h4>
      <br />
      <h6 class="card-subtitle mb-2 text-muted">${n.author} - ${n.publishedAt}</h6>
      <p class="card-text">${n.description}</p>
      <a href="${n.url}" target="_blank" class="btn btn-outline-success btn-sm">Read More...</a>
    </div>
  </div>
</div>`;
}
