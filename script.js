document.addEventListener('DOMContentLoaded', () => {
    // плавный скролл
    document.querySelectorAll('.header__nav a').forEach(a=>{
      a.addEventListener('click', e=>{
        const href=a.getAttribute('href');
        if(href.startsWith('#')){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth'}); }
      });
    });
  
    // кнопка вверх и фон хедера
    const btnUp=document.createElement('button'); btnUp.textContent='↑'; 
    Object.assign(btnUp.style,{position:'fixed',bottom:'30px',right:'30px',width:'40px',height:'40px',background:'#F6762C',color:'#fff',border:'none',borderRadius:'50%',fontSize:'24px',cursor:'pointer',display:'none',zIndex:'999'});
    document.body.append(btnUp);
    btnUp.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
    window.addEventListener('scroll',()=>{
      btnUp.style.display=window.scrollY>300?'block':'none';
      document.querySelector('.header').style.background=window.scrollY>50?'#111':'transparent';
    });
  
    // модалка
    const modalOverlay=document.getElementById('modal-overlay');
    modalOverlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:9999;';
    modalOverlay.innerHTML=`
      <div style="background:#1c1c1c;padding:30px;border-radius:10px;width:90%;max-width:400px;color:#fff;">
        <h2 style="text-align:center;">Оформление заказа</h2>
        <form id="orderForm">
          <label>Имя<input name="name" required></label>
          <label>Телефон<input name="phone" type="tel" required></label>
          <label>Выберите блюдо
            <select name="item" required>
              <option value="">— Выбрать —</option>
              <option>Классический бургер</option>
              <option>Чизбургер</option>
              <option>Пицца</option>
              <option>Куриная паэлья</option>
              <option>Taco Del Mar</option>
              <option>Bon Au Pain</option>
              <option>Pizza Hut</option>
            </select>
          </label>
          <label>Кол-во<input name="quantity" type="number" min="1" value="1" required></label>
          <label>Комментарий<textarea name="comment"></textarea></label>
          <div style="text-align:center;margin-top:20px;">
            <button type="submit">Отправить</button>
            <button type="button" id="closeModal" style="margin-left:10px;">Закрыть</button>
          </div>
        </form>
      </div>`;
    // Открыть/закрыть
    document.querySelectorAll('.btn').forEach(b=>b.addEventListener('click',e=>{
      if(b.textContent.toLowerCase().includes('заказать')){ e.preventDefault(); modalOverlay.style.display='flex'; }
    }));
    modalOverlay.querySelector('#closeModal').onclick=()=>modalOverlay.style.display='none';
  
    // submit
    modalOverlay.querySelector('#orderForm').addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(e.target);
      alert(`Спасибо, ${data.get('name')}! Вы заказали ${data.get('item')} (×${data.get('quantity')}).`);
      modalOverlay.style.display='none';
      e.target.reset();
    });
  
    // анимации
    const items=document.querySelectorAll('.food-list__card, .product__card, .order, .feedback, .download');
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('animate-visible'); obs.unobserve(en.target); } });
    }, {threshold:0.2});
    items.forEach(el=>{ el.classList.add('animate-hidden'); obs.observe(el); });
  });
  