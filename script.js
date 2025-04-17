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

  // Активный хотбар (navigation highlight)
const navLinks = document.querySelectorAll('.header__nav a');
const sections = document.querySelectorAll('main > section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.classList[0];
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
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
  
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

  // ========== Модалка ==========
  const modalOverlay = document.getElementById('orderModal');
  const modalClose   = document.getElementById('modalClose');
  const orderForm    = document.getElementById('orderForm');
  const orderDishInp = document.getElementById('orderDish');

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
    // Отправляем JSON
    const payload = JSON.stringify(data);
    if (window.Telegram && Telegram.WebApp) {
      Telegram.WebApp.sendData(payload);
    } else {
      alert('Данные заказа:\n' + payload);
    }
    closeModal();
  });
});
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (btn.textContent.toLowerCase().includes("order")) {
      e.preventDefault();
      modal.style.display = "block";
    }
  });
});
modal.querySelector("#closeModal").addEventListener("click", () => modal.style.display = "none");
modal.querySelector("#sendOrder").addEventListener("click", () => {
  alert("Thank you! Your order has been sent.");
  modal.style.display = "none";
});

// Анимация появления при скролле
const animatedElems = document.querySelectorAll('.food-list__card, .product__card, .order, .feedback, .download');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

animatedElems.forEach(elem => {
  elem.classList.add('animate-hidden');
  observer.observe(elem);
});
