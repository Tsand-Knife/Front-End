// Tombol mulai belajar - efek klik
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".btn-start");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startBtn.classList.add("clicked");
      setTimeout(() => startBtn.classList.remove("clicked"), 200);
    });
  }

// Simulasi data dashboard yang bisa berubah-ubah
let dashboardData = {
  totalKuis: 12,
  rataRataNilai: 85,
  progres: 72
};

function updateDashboard() {
  document.getElementById("total-kuis").textContent = dashboardData.totalKuis;
  document.getElementById("rata-nilai").textContent = `${dashboardData.rataRataNilai}%`;
  document.getElementById("progres-belajar").textContent = `${dashboardData.progres}%`;
}

// Fungsi untuk mengubah data secara acak (simulasi real-time)
function simulateDataChange() {
  dashboardData.totalKuis += Math.floor(Math.random() * 2); // naik 0 atau 1
  dashboardData.rataRataNilai = Math.min(100, dashboardData.rataRataNilai + (Math.random() > 0.5 ? 1 : -1));
  dashboardData.progres = Math.min(100, dashboardData.progres + (Math.random() > 0.5 ? 1 : 0));
}

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();

  // BONUS: update otomatis setiap 5 detik
  setInterval(() => {
    simulateDataChange();      // ubah data
    updateDashboard();         // tampilkan ke UI
  }, 5000); // 5000ms = 5 detik
});

const filterSelect = document.querySelector('.filter-select');
const tbody = document.getElementById('leaderboard-body');

// Fungsi untuk update leaderboard dari data
function updateLeaderboard(data) {
  tbody.innerHTML = '';
  if (!data || data.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="3">Belum ada data.</td>`;
    tbody.appendChild(row);
    return;
  }

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${item.skor}</td>
    `;
    tbody.appendChild(row);
  });
}

// Simulasi data kosong awal
updateLeaderboard([]);

// Event saat filter dipilih
filterSelect.addEventListener('change', (e) => {
  const selectedTopic = e.target.value;

  // Ganti URL ini nanti dengan URL backend API kamu
  fetch(`/api/leaderboard?topik=${encodeURIComponent(selectedTopic)}`)
    .then(res => res.json())
    .then(data => updateLeaderboard(data))
    .catch(() => {
      // Jika belum ada database / API error
      updateLeaderboard([]);
    });
});



  // Fade in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card, .leaderboard, .dashboard").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-content");
  hero.style.opacity = 0;
  hero.style.transform = "translateY(40px)";
  hero.style.transition = "all 1s ease";

  setTimeout(() => {
    hero.style.opacity = 1;
    hero.style.transform = "translateY(0)";
  }, 300);
});