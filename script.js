// js/script.js
// File JavaScript chung cho toàn bộ dự án 707-MSSV
// Tác giả: [Tên bạn] - MSSV: [MSSV bạn]
console.log('%c707-231A010878', 'color: #27ae60; font-size: 18px; font-weight: bold;');
// === BÀI 1: Tìm kiếm sản phẩm (baitap01.html) ===
if (document.getElementById('searchInput')) {
  const products = [
    { id: 1, name: "Laptop Dell XPS 13", price: 25000000, img: "https://via.placeholder.com/300x200?text=Laptop+Dell" },
    { id: 2, name: "iPhone 15 Pro", price: 30000000, img: "https://via.placeholder.com/300x200?text=iPhone+15" },
    { id: 3, name: "Tai nghe Sony WH-1000XM5", price: 8500000, img: "https://via.placeholder.com/300x200?text=Sony+Headphone" },
    { id: 4, name: "Máy ảnh Canon EOS R6", price: 58000000, img: "https://via.placeholder.com/300x200?text=Canon+R6" },
    { id: 5, name: "Bàn phím cơ Keychron K8", price: 2200000, img: "https://via.placeholder.com/300x200?text=Keychron+K8" },
    { id: 6, name: "Đồng hồ Apple Watch Ultra", price: 19000000, img: "https://via.placeholder.com/300x200?text=Apple+Watch" }
  ];

  const productList = document.getElementById('productList');
  const searchInput = document.getElementById('searchInput');
  const notFound = document.getElementById('notFound');

  function renderProducts(arr) {
    if (arr.length === 0) {
      notFound.style.display = 'block';
      productList.innerHTML = '';
      return;
    }
    notFound.style.display = 'none';
    productList.innerHTML = arr.map(p => `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">${p.price.toLocaleString('vi-VN')} ₫</p>
      </div>
    `).join('');
  }

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  });

  // Hiển thị lần đầu
  renderProducts(products);
}

// === BÀI 2: Form đăng ký (baitap02.html) ===
if (document.getElementById('registerForm')) {
  const form = document.getElementById('registerForm');
  const successMsg = document.getElementById('successMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const agree = document.getElementById('agree').checked;

    // Reset lỗi
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    let valid = true;
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Email không hợp lệ';
      valid = false;
      return;
    }

    // Validate password: ít nhất 8 ký tự, có hoa, thường, số
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      document.getElementById('passError').textContent ='Mật khẩu ít nhất 8 ký tự, phải có chữ hoa, chữ thường và số';
      valid = false;
      return;
    }

    if (!agree) {
      alert('Bạn phải đồng ý với điều khoản sử dụng!');
      return;
    }

    // Lưu vào LocalStorage (chỉ demo - thực tế không lưu mật khẩu plain text)
    const user = { name, email, registeredAt: new Date().toLocaleString('vi-VN') };
    localStorage.setItem('registeredUser', JSON.stringify(user));
    // Lưu thêm mật khẩu riêng (demo)
    localStorage.setItem('userPasswordHash', btoa(password)); // mã hóa base64 nhẹ

    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => successMsg.style.display = 'none', 5000);
  });
}

// === BÀI 3: Đồng hồ đếm ngược (baitap03.html) ===
if (document.getElementById('timer')) {
  let timeLeft = 10 * 60; // 10 phút
  let timerId = null;
  const timerDisplay = document.getElementById('timer');
  const modal = document.getElementById('modal');
  const resetBtn = document.getElementById('resetBtn');

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft < 60) {
      timerDisplay.classList.add('urgent');
    } else {
      timerDisplay.classList.remove('urgent');
    }

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      modal.style.display = 'flex';
    }
  }

  function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();
    }, 1000);
  }

  resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 10 * 60;
    timerDisplay.classList.remove('urgent');
    modal.style.display = 'none';
    updateDisplay();
    startTimer();
  });

  // Bắt đầu tự động
  startTimer();
  updateDisplay();
}

// === CONTACT FORM (contact.html) ===
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const success = document.getElementById('contactSuccess');
    success.style.display = 'block';
    this.reset();
    setTimeout(() => success.style.display = 'none', 4000);
  });
}

// === LOG KHI LOAD TRANG (giúp kiểm tra lỗi) ===
console.log('%c707-MSSV - JavaScript loaded successfully!', 'color: #27ae60; font-size: 16px; font-weight: bold;');