const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
];

let currentQuote = {};

function getNewQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  document.getElementById("quote-text").innerText = `"${currentQuote.text}"`;
  document.getElementById("quote-author").innerText = `– ${currentQuote.author}`;
}

function saveFavorite() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(currentQuote);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showFavorites();
}

function showFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const list = document.getElementById("favorites-list");
  list.innerHTML = "";
  favorites.forEach((q) => {
    const li = document.createElement("li");
    li.innerText = `"${q.text}" – ${q.author}`;
    list.appendChild(li);
  });
}

function shareQuote() {
  const text = `"${currentQuote.text}" – ${currentQuote.author}`;
  if (navigator.share) {
    navigator.share({
      title: "Inspiring Quote",
      text: text,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  }
}

// On load
getNewQuote();
showFavorites();
