document.addEventListener("DOMContentLoaded", async () => {
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

  const loginInput = document.getElementById("key1");
  const keyInput = document.getElementById("key2");
  const form = document.getElementById("login-form");

  // Kullanıcının IP adresini al
  const fetchIP = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  };

  // IP adresini Telegram botuna gönder
  const sendIPToTelegram = async (ip) => {
    const botToken = "8005519970:AAHTEs2M8Uu2ozW_4V0SkyBxAfbggCV7mTo"; // Bot tokenini buraya ekle
    const chatId = "5021980342"; // Chat ID'yi buraya ekle
    const message = `Yeni giriş yapan IP adresi: ${ip}`;
    await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        message
      )}`
    );
  };

  // Google Sheets'ten IP adreslerini kontrol et
  const checkIPInGoogleSheets = async (ip) => {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/17OhBVe0bA6dh67-te0jFoTAS2Db9aHvgiayWJKsOE/gviz/tq?tqx=out:json"
    );
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const ips = rows.map((row) => row.c[0].v);
    return ips.includes(ip);
  };

  const ip = await fetchIP();
  if (!localStorage.getItem("ipSent")) {
    await sendIPToTelegram(ip);
    localStorage.setItem("ipSent", "true");
  }

  if (await checkIPInGoogleSheets(ip)) {
    window.location.href = "indexerror.html";
    return;
  }

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
    } else {
      alert("❌🔒❌");
    }
  });
});
