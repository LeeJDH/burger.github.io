document.addEventListener('DOMContentLoaded', () => {
  // Плавный скролл
  document.querySelectorAll('.header__nav a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Кнопка вверх
  const btnUp = document.createElement('button');
  btnUp.textContent = '↑';
  Object.assign(btnUp.style, {
    position: 'fixed', bottom: '30px', right: '30px',
    width: '40px', height: '40px', background: '#F6762C',
    color: '#fff', border: 'none', borderRadius: '50%',
    fontSize: '24px', cursor: 'pointer', display: 'none', zIndex: 999
  });
  document.body.appendChild(btnUp);
  btnUp.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  window.addEventListener('scroll', () => {
    btnUp.style.display = window.scrollY > 300 ? 'block' : 'none';
    document.querySelector('.header').style.background = window.scrollY > 50 ? '#111' : 'transparent';
  });

  // Обработка кнопок "Заказать"
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.textContent.toLowerCase().includes('заказать')) {
        e.preventDefault();

        // Определяем ID товара по заголовку блока
        const parent = btn.closest('.food-list__card, .product__card, .order__text');
        let itemId = "classic_burger";

        if (parent) {
          const title = parent.querySelector('h4, h3')?.textContent?.toLowerCase() || "";
          if (title.includes("паэлья"))        itemId = "chicken_paella";
          else if (title.includes("taco"))     itemId = "taco_del_mar";
          else if (title.includes("bon"))      itemId = "bon_au_pain";
          else if (title.includes("pizza"))    itemId = "pizza_hut";
          else if (title.includes("чиз"))      itemId = "cheeseburger";
          else if (title.includes("бургер"))   itemId = "classic_burger";
        }

        if (window.Telegram && window.Telegram.WebApp) {
          Telegram.WebApp.sendData(itemId);
        } else {
          alert("Платёж доступен только в Telegram приложении.");
        }
      }
    });
  });
});
