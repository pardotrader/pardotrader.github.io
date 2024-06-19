function loadLazyElements() {
  const lazyElements = document.querySelectorAll('.lazy-load');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyElement = entry.target;
        const symbol = lazyElement.innerText.trim();

        // Crie o contêiner para o gráfico TradingView
        const container = document.createElement('div');
        container.style.width = '70%';
        container.style.height = '430px';

        // Crie o elemento script para carregar o gráfico TradingView
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = `{
          "symbols": [
            {
              "description": "",
              "proName": "BMFBOVESPA:${symbol}"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "light",
          "isTransparent": false,
          "displayMode": "adaptive",
          "locale": "br",
          "customer": "bovespa"
        }`;

        // Adicione o contêiner e o script ao elemento lazy-load
        lazyElement.innerHTML = '';
        lazyElement.appendChild(container);
        lazyElement.appendChild(script);

        observer.unobserve(lazyElement);
      }
    });
  });

  lazyElements.forEach(lazyElement => {
    observer.observe(lazyElement);
  });
}

window.addEventListener('load', loadLazyElements);