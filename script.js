document.addEventListener('DOMContentLoaded', () => {
  // ========== Smooth scroll ==========
  document.querySelectorAll('.header__nav a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== Back to top & header bg ==========
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

  // ========== Модалка ==========
  const modalOverlay = document.getElementById('orderModal');
  const modalClose   = document.getElementById('modalClose');
  const orderForm    = document.getElementById('orderForm');
  const orderDishInp = document.getElementById('orderDish');
  // У тебя в HTML нет orderPriceInp, убираем этот код

  function openModal(dishId) {
    orderDishInp.value = dishId;
    modalOverlay.style.display = 'flex';
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    orderForm.reset();
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // ========== Кнопки "Заказать" ==========
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const txt = btn.textContent.toLowerCase();
      if (!txt.includes('заказать')) return;

      e.preventDefault();
      // Определяем ID блюда
      const parent = btn.closest('.food-list__card, .product__card, .order__text');
      let dish = 'classic_burger';
      if (parent) {
        const title = (parent.querySelector('h4, h3')?.textContent || '').toLowerCase();
        if (title.includes('паэлья'))   dish = 'chicken_paella';
        else if (title.includes('taco')) dish = 'taco_del_mar';
        else if (title.includes('bon'))  dish = 'bon_au_pain';
        else if (title.includes('pizza'))dish = 'pizza_hut';
        else if (title.includes('чиз'))  dish = 'cheeseburger';
      }
      openModal(dish);
    });
  });

  // ========== Сабмит формы ==========
  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(orderForm).entries());
    const payload = JSON.stringify(data);
    if (window.Telegram && Telegram.WebApp) {
      Telegram.WebApp.sendData(payload);
    } else {
      alert('Данные заказа:\n' + payload);
    }
    closeModal();
  });
});

// ===== Scroll Reveal Animation =====
const animatedItems = document.querySelectorAll('.animate-hidden');
const revealOnScroll = () => {
  animatedItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.classList.add('animate-visible');
    }
  });
};
revealOnScroll(); // запустить при загрузке
window.addEventListener('scroll', revealOnScroll);
