// app.js

// Ваш Alpha Vantage API ключ
const ALPHA_KEY = 'ZE5YM6UL081RSSBT';
// Предопределённый список популярных акций
const STOCK_SYMBOLS = ['AAPL','MSFT','GOOGL','AMZN','TSLA','NVDA','META','BRK.B','V','JPM'];

document.addEventListener('DOMContentLoaded', () => {
  const pref = new URLSearchParams(location.search).get('pref');
  const container = document.getElementById('top-assets');
  const cryptoSection = document.getElementById('section-crypto');
  const stocksSection = document.getElementById('section-stocks');

  // Переставляем блоки
  container.innerHTML = '';
  if (pref === 'stocks') container.append(stocksSection, cryptoSection);
  else container.append(cryptoSection, stocksSection);

  // Загружаем данные
  loadCrypto();
  loadStocks();
});

// Загрузка топ-10 криптовалют
async function loadCrypto() {
  try {
    const data = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    ).then(r => r.json());
    render(data, 'crypto-list', 'current_price', 'price_change_percentage_24h');
  } catch (e) {
    document.getElementById('crypto-list').textContent = 'Ошибка загрузки данных.';
    console.error(e);
  }
}

// Загрузка топ-10 акций через Alpha Vantage GLOBAL_QUOTE
async function loadStocks() {
  try {
    const promises = STOCK_SYMBOLS.map(sym =>
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${ALPHA_KEY}`
      )
        .then(r => r.json())
        .then(json => {
          const q = json['Global Quote'] || {};
          return {
            symbol: q['01. symbol'] || sym,
            name:   q['01. symbol'] || sym,
            current_price: parseFloat(q['05. price']) || null,
            price_change_percentage_24h: q['10. change percent']
              ? parseFloat(q['10. change percent'])
              : null
          };
        })
    );
    const results = await Promise.all(promises);
    render(results, 'stocks-list', 'current_price', 'price_change_percentage_24h');
  } catch (e) {
    document.getElementById('stocks-list').textContent = 'Ошибка загрузки данных.';
    console.error(e);
  }
}

// Общая функция рендера
function render(items, containerId, priceKey, changeKey) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = '';
  items.forEach(item => {
    const price = item[priceKey] != null ? '$' + item[priceKey].toFixed(2) : '–';
    let change = '–';
    let changeClass = '';
    if (item[changeKey] != null) {
      change = item[changeKey].toFixed(2) + '%';
      changeClass = item[changeKey] >= 0 ? 'up' : 'down';
    }
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `
      <div>
        <div class="asset-card__symbol">${item.symbol.toUpperCase()}</div>
        <div class="asset-card__name">${item.name}</div>
      </div>
      <div class="asset-card__stats">
        <span class="asset-card__price">${price}</span>
        <span class="asset-card__change ${changeClass}">${change}</span>
      </div>`;
    cont.append(card);
  });
}
