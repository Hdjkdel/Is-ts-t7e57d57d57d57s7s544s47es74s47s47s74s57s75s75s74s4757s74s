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
    } else {
      alert("❌🔒❌");
    }
  });
});
