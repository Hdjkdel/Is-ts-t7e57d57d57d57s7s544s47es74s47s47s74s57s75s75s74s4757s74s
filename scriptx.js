// scriptx.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-visibility");
  const walletInput = document.getElementById("wallet-address");
  const withdrawBtn = document.getElementById("withdraw-btn");

  // Görünürlük butonu işlevi
  toggleBtn.addEventListener("click", () => {
    if (walletInput.type === "password") {
      walletInput.type = "text";
      toggleBtn.textContent = "Hide";
    } else {
      walletInput.type = "password";
      toggleBtn.textContent = "Show";
    }
  });

  // Withdraw butonu işlevi
  withdrawBtn.addEventListener("click", function () {
    // Cüzdan adresi kontrolü
    if (!walletInput.value.trim()) {
      alert("⚠️ No wallet address entered.");
      return;
    }

    // Bakiye sıfırlama
    const balances = document.querySelectorAll(".stat-box span, .dashboard-box span");
    balances.forEach((balance) => {
      balance.textContent = "0,00$";
    });

    // Çekilebilir bakiye olup olmadığını kontrol et
    if (parseFloat(walletInput.value)) {
      alert("⚠️ No balance");
    } else {
      alert("⚠️ No balance available to withdraw.");
    }
  });

  // Başlangıçta input type'ı 'password' yapılıyor
  walletInput.type = "password";
});
