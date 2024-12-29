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
    { login: "2007", key: "2007", redirect: "index9.html" },
  ];

  const blockedIPs = new Set(); // Engellenen IP'leri tutar
  const loginInput = document.getElementById("key1");
  const keyInput = document.getElementById("key2");
  const form = document.getElementById("login-form");

  // Kullanıcının IP adresini al ve kontrol et
  async function getIPAddress() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("IP adresi alınamadı:", error);
      return null;
    }
  }

  // Engelli kontrolü ve yönlendirme
  async function handleLogin(event) {
    event.preventDefault();

    const ipAddress = await getIPAddress();
    if (ipAddress && blockedIPs.has(ipAddress)) {
      alert("Bu cihaz engellenmiştir.");
      window.location.href = "indexerror.html";
      return;
    }

    const loginValue = loginInput.value.trim();
    const keyValue = keyInput.value.trim();

    const matchedCredential = credentials.find(
      (cred) => cred.login === loginValue && cred.key === keyValue
    );

    if (matchedCredential) {
      alert("✅ Giriş başarılı!");
      localStorage.setItem("authorized", matchedCredential.login); // Giriş bilgisi kaydet
      window.location.href = matchedCredential.redirect; // İlgili dosyaya yönlendir
    } else {
      alert("❌ Giriş bilgileri hatalı!");
    }
  }

  // Form gönderme olayı
  form.addEventListener("submit", handleLogin);

  // Daha önce giriş yapılmışsa otomatik yönlendirme
  const previousLogin = localStorage.getItem("authorized");
  if (previousLogin) {
    const redirectPage = credentials.find(
      (cred) => cred.login === previousLogin
    )?.redirect;
    if (redirectPage) {
      window.location.href = redirectPage;
    }
  }
});
