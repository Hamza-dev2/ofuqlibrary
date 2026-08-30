const bookdata = {
  "b1": {
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    price: "9.99 $",
    description: "أكثر النسخة مبيعا، الرواية التي تغير نظرتك في التعامل مع التحديات والضغوطات.",
    image: "2.jpg"
  },
  "b2": {
    title: "نظــرية الفسـتق",
    author: "فهد عامر الأحمدي",
    price: "$ 15.99",
    description: "كتاب يساعدك على تطوير ذاتك وفهم السلوك الإنساني وتحسين اتخاذ القرارات.",
    image: "3.jpg"
  },
  "b3": {
    title: "عدَّاء الطائرة الورقية",
    author: "خالد حسيني",
    price: "$ 13.99",
    description: "قصة مؤثرة عن الصداقة والذنب والقدر في أفغانستان.",
    image: "1.png"
  },
  "b4": {
    title: "قوُّة عقلك الباطن",
    author: "جوزيف ميرفى",
    price: "$ 22.99",
    description: "دليلك العملي لاستخدام العقل الباطن لتحقيق النجاح وجلب الثروة والسعادة.",
    image: "4.jpg"
  }
};

const urlParams = new URLSearchParams(window.location.search);
const bookKey = urlParams.get('book');

if (bookdata[bookKey]) {
  const book = bookdata[bookKey];
  document.getElementById('book-title').textContent = book.title;
  document.getElementById("book-author").textContent = book.author;
  document.getElementById('book-price').textContent = book.price;
  document.getElementById('book-desc').textContent = book.description;
  document.getElementById('book-img').src = book.image;
}

const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');
const searchDropdown = document.getElementById('search-dropdown');

const searchBooks = [
    { title: 'فن اللامبالاة', author: 'مارك مانسون', url: 'book-details.html?book=b1', image: '2.jpg' },
    { title: 'نظرية الفستق', author: 'فهد عامر الاحمدي', url: 'book-details.html?book=b2', image: '3.jpg' },
    { title: 'عداء الطائرة الورقية', author: 'خالد حسيني', url: 'book-details.html?book=b3', image: '1.png' },
    { title: 'قوة عقلك الباطن', author: 'جوزيف ميرفي', url: 'book-details.html?book=b4', image: '4.jpg' },
];

if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', () => {
        if (searchInput.style.display === 'none' || searchInput.style.display === '') {
            searchInput.style.display = 'inline-block';
            searchInput.focus();
        } else {
            searchInput.style.display = 'none';
            searchDropdown.style.display = 'none'; 
            searchInput.value = '';
        }
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        searchDropdown.innerHTML = '';

        if (term === '') {
            searchDropdown.style.display = 'none';
            return;
        }

        const filteredBooks = searchBooks.filter(book => 
            book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
        );

        if (filteredBooks.length > 0) {
            searchDropdown.style.display = 'block';
            filteredBooks.forEach(book => {
                searchDropdown.innerHTML += `
                    <a href="${book.url}" style="display: flex; align-items: center; padding: 8px 12px; border-bottom: 1px solid #eee; text-decoration: none; color: #2C3E50; transition: background 0.2s;">
                        <img src="${book.image}" style="width: 30px; height: 40px; object-fit: cover; margin-left: 10px; border-radius: 3px;">
                        <div>
                            <div style="font-size: 14px; font-weight: bold; color: #2C3E50;">${book.title}</div>
                            <div style="font-size: 11px; color: #7F8C8D;">${book.author}</div>
                        </div>
                    </a>
                `;
            });
        } else {
            searchDropdown.style.display = 'block';
            searchDropdown.innerHTML = `<div style="padding: 12px; text-align: center; color: #E67E22; font-size: 13px;">لا توجد نتائج بحث مطابقة</div>`;
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchIcon.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');
const navItems = document.querySelectorAll('nav ul li a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
    });
});

let cart = JSON.parse(localStorage.getItem('bookshop_cart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('bookshop_cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems(); 
}

function showSuccessPopup() {
    const existingPopup = document.getElementById('success-popup');
    if (existingPopup) existingPopup.remove();

    const popupHTML = `
        <div id="success-popup" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%) scale(0.8); background:rgba(44, 62, 80, 0.95); width:90px; height:90px; border-radius:14px; z-index:9999; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 30px rgba(0,0,0,0.3); opacity:0; transition:all 0.3s ease-in-out;">
            <div style="width:45px; height:45px; background:#27ae60; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 15px rgba(39,174,96,0.5);">
                <i class="fa-solid fa-check" style="font-size:24px; color:white;"></i>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const popup = document.getElementById('success-popup');
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);

    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => popup.remove(), 300);
    }, 1500);
}

function addToCart(bookData) {
    const existingIndex = cart.findIndex(item => item.id === bookData.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...bookData, quantity: 1 });
    }
    saveCart();
    showSuccessPopup();
}

function decreaseQuantity(bookId) {
    const itemIndex = cart.findIndex(item => item.id === bookId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
}

function createCartModal() {
    if (document.getElementById('cart-modal')) return;

    const modalHTML = `
        <div id="cart-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:2000; justify-content:center; align-items:center;">
            <div style="background:white; width:80%; height:80%; border-radius:12px; padding:30px; box-shadow:0 5px 20px rgba(0,0,0,0.4); text-align:right; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
                
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #eee; padding-bottom:15px;">
                    <h3 style="margin:0; color:#2C3E50; font-size:28px;">قائمة المشتريات</h3>
                    <button id="close-cart" style="background:none; border:none; font-size:32px; cursor:pointer; color:#7F8C8D;">&times;</button>
                </div>

                <div id="cart-items-container" style="flex-grow:1; overflow-y:auto; margin: 15px 0; padding-left: 10px;">
                </div>

                <div id="cart-summary" style="border-top:2px solid #eee; padding-top:20px; font-weight:bold; font-size:20px; color:#2C3E50;">
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('close-cart').addEventListener('click', toggleCartModal);
    document.getElementById('cart-modal').addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') toggleCartModal();
    });
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    if (!container || !summary) return;

    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#7F8C8D; padding:50px; font-size:22px;">سلة المشتريات فارغة حالياً</p>`;
        summary.innerHTML = '';
        return;
    }

    let totalBooksCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        let cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        let itemTotal = cleanPrice * item.quantity;
        totalBooksCount += item.quantity;
        totalPrice += itemTotal;

        container.innerHTML += `
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f1f1; padding:18px 0;">
                <div style="display:flex; align-items:center; gap:20px;">
                    <img src="${item.image}" style="width:65px; height:90px; object-fit:cover; border-radius:8px;">
                    <div>
                        <div style="font-weight:bold; font-size:20px; color:#2C3E50; margin-bottom:5px;">${item.title}</div>
                        <div style="font-size:16px; color:#7F8C8D; margin-bottom:5px;">المؤلف: ${item.author}</div>
                        <div style="font-size:16px; color:#E67E22; font-weight:bold;">السعر: ${item.price}</div>
                    </div>
                </div>
                
                <div style="display:flex; align-items:center; gap:25px;">
                    <div style="font-size:18px; color:#555; background:#f8f9fa; padding:8px 16px; border-radius:8px; border:1px solid #ddd;">
                        العدد: <span style="font-weight:bold; color:#2C3E50;">${item.quantity}</span>
                    </div>

                    <div style="font-size:20px; font-weight:bold; color:#2C3E50; min-width:90px; text-align:left;">
                        $ ${itemTotal.toFixed(2)}
                    </div>

                    <button onclick="decreaseQuantity('${item.id}')" style="background:#e74c3c; color:white; border:none; width:40px; height:40px; border-radius:8px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center;" title="تقليص نسخة (-1)">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    summary.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:19px;">
            <span>إجمالي عدد الكتب:</span>
            <span>${totalBooksCount} كتاب</span>
        </div>
        <div style="display:flex; justify-content:space-between; color:#E67E22; font-size:23px;">
            <span>المبلغ الكلي للمشتريات:</span>
            <span>$ ${totalPrice.toFixed(2)}</span>
        </div>
    `;
}

function toggleCartModal() {
    createCartModal();
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        renderCartItems();
        modal.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.parentElement.addEventListener('click', toggleCartModal);
    }

    document.querySelectorAll('.book').forEach(bookElement => {
        const btnBook = bookElement.querySelector('.btn-book');
        const link = bookElement.querySelector('a');

        if (btnBook && link) {
            const hrefValue = link.getAttribute('href');
            const urlParams = new URLSearchParams(hrefValue.split('?')[1]);
            const bId = urlParams.get('book');

            btnBook.addEventListener('click', (e) => {
                e.preventDefault();
                if (bId && bookdata[bId]) {
                    const book = bookdata[bId];
                    addToCart({
                        id: bId,
                        title: book.title,
                        author: book.author,
                        price: book.price,
                        image: book.image
                    });
                }
            });
        }
    });

    const addBtn = document.querySelector('.btn-add');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (typeof bookKey !== 'undefined' && bookdata[bookKey]) {
                const currentBook = bookdata[bookKey];
                addToCart({
                    id: bookKey,
                    title: currentBook.title,
                    author: currentBook.author,
                    price: currentBook.price,
                    image: currentBook.image
                });
            }
        });
    }
});