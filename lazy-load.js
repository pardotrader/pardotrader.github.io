function loadLazyElements() {
  const lazyElements = document.querySelectorAll('.lazy-load');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyElement = entry.target;
        const symbol = lazyElement.innerText.trim();

        // Crie o contêiner para o gráfico
        const container = document.createElement('div');
        container.style.width = '70%';
        container.style.height = '430px';

        // Adicione o contêiner ao elemento lazy-load
        lazyElement.innerHTML = '';
        lazyElement.appendChild(container);

        // Faça uma requisição para obter os dados do gráfico
        fetch(`https://api.tradingview.com/data/symbols/${symbol}/history?from=1577836800&to=1609459200`)
          .then(response => response.json())
          .then(data => {
            // Crie o gráfico usando o Chart.js
            const ctx = container.getContext('2d');
            const chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: data.t.map(time => new Date(time * 1000).toLocaleDateString()),
                datasets: [{
                  label: symbol,
                  data: data.c,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'month'
                    }
                  }]
                }
              }
            });
          })
          .catch(error => {
            console.error('Erro ao obter dados do gráfico:', error);
          });

        observer.unobserve(lazyElement);
      }
    });
  });

  lazyElements.forEach(lazyElement => {
    observer.observe(lazyElement);
  });
}

window.addEventListener('load', loadLazyElements);