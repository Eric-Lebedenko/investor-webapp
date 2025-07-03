// app.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Заполнение «Портфеля» (пример статичных данных)
  const total = 12345.67;
  const ret   = 5.23;
  document.getElementById('pf-value').textContent = `$${total.toLocaleString()}`;
  document.getElementById('pf-return').textContent = `${ret.toFixed(2)}%`;

  // 2) Данные для графика (пример)
  const labels = ['09:00','10:00','11:00','12:00','13:00'];
  const data   = [1200, 1250, 1230, 1300, 1280];

  // 3) Инициализация Chart.js
  const ctx = document.getElementById('pf-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Стоимость, $',
        data,
        borderColor: '#000',      // чёрная линия
        borderWidth: 2,
        pointRadius: 0,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#000',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#000' } },
        y: { grid: { color: '#ddd' }, ticks: { color: '#000' } }
      }
    }
  });

  // 4) Заполнение макро (здесь заглушки; позже можно вызвать API)
  document.querySelector('#macro-list li:nth-child(1) span').textContent = '3.2% (май)';
  document.querySelector('#macro-list li:nth-child(2) span').textContent = '5.1% (июнь)';
  document.querySelector('#macro-list li:nth-child(3) span').textContent = '4.5% (июль)';
});
