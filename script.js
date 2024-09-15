const API_KEY = "26f9458fb03d461fbed831d309cf94da";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews('India'));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data  = await res.json();
    console.log(data);
    bindData(data.articles);
}
function  bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const cardsTemplete = document.getElementById('templete-news-card');

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardsTemplete.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsDes = cardClone.querySelector('#news-description')
    const newsSrc = cardClone.querySelector('#news-src')
    const newsTitle = cardClone.querySelector('#news-title')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta"
    });

    newsSrc.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}
}

let curSelectedNav = null;

function onNavItemClicked(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");

}

const searchBar = document.getElementById('news-input');
const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click',()=>{
    const query = searchBar.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;


});








