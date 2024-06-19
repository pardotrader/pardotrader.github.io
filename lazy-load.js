function loadLazyElements() {
  const lazyElements = document.querySelectorAll('.lazy-load');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyElement = entry.target;
        // Carregue o gráfico TradingView aqui
        const symbol = lazyElement.innerText.trim();
        const container = document.createElement('div');
        container.style.width = '70%';
        container.style.height = '430px';
        lazyElement.innerHTML = '';
        lazyElement.appendChild(container);
        new TradingView.widget({
          'container_id': container.id,
          'width': '100%',
          'height': '100%',
          'symbol': `BMFBOVESPA:${symbol}`,
          'interval': 'D',
          'timezone': 'America/Sao_Paulo',
          'theme': 'light',
          'style': '2',
          'locale': 'br',
          'toolbar_bg': '#f1f3f6',
          'hide_top_toolbar': true,
          'withdateranges': true,
          'enable_publishing': false,
          'save_image': false,
          'allow_symbol_change': false,
          'hideideas': true,
          'customer': 'bovespa',
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