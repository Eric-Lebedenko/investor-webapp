// Проверка, что мини-приложение запущено внутри Telegram
if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand(); // делает окно большим

    // Отобразим имя пользователя
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `<b>Пользователь:</b> ${tg.initDataUnsafe.user?.first_name || 'Гость'}`;

    // Демонстрация портфеля (пример)
    const portfolioData = [
        { asset: 'AAPL', qty: 10, price: 210, value: 2100 },
        { asset: 'BTC', qty: 0.05, price: 60000, value: 3000 }
    ];

    let portfolioHtml = '';
    portfolioData.forEach(row => {
        portfolioHtml += `<tr>
            <td>${row.asset}</td>
            <td>${row.qty}</td>
            <td>${row.price}</td>
            <td>${row.value}</td>
        </tr>`;
    });
    document.getElementById('portfolio-table').innerHTML = portfolioHtml;

    // Пример аналитики
    document.getElementById('analytics-content').innerHTML = `
        <p>📊 Доходность портфеля: <b>+12%</b></p>
        <p>Риск-профиль: <b>Умеренный</b></p>
    `;
}
