document.addEventListener("DOMContentLoaded", () => {
  const credentials = [
    { login: "8393", key: "73868" },
    { login: "07590", key: "99567" },
    { login: "07591", key: "00257" },
    { login: "07592", key: "92092" },
    { login: "07593", key: "93022" },
    { login: "07594", key: "94027" },
    { login: "07595", key: "95290" },
    { login: "07596", key: "96028" },
    { login: "07597", key: "97038" },
    { login: "07598", key: "98026" },
    { login: "07599", key: "99983" },
    { login: "07100", key: "10025" },
    { login: "10001", key: "19280" },
    { login: "10002", key: "20478" },
    { login: "10003", key: "30857" },
    { login: "10004", key: "48857" },
    { login: "10005", key: "59287" },
    { login: "10006", key: "92857" },
    { login: "10007", key: "92738" },
    { login: "10008", key: "10007" },
    { login: "1", key: "1" },
  ];

  const loginInput = document.getElementById("key1");
  const keyInput = document.getElementById("key2");
  const form = document.getElementById("login-form");

  // Daha önce giriş yapılmışsa, direkt yönlendir
  if (localStorage.getItem("authorized") === "true") {
    window.location.href = "index5.html";
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginValue = loginInput.value.trim();
    const keyValue = keyInput.value.trim();

    const isValid = credentials.some(
      (cred) => cred.login === loginValue && cred.key === keyValue
    );

    if (isValid) {
      alert("✅🔓✅");
      localStorage.setItem("authorized", "true"); // Cihazda kaydet
      window.location.href = "indexf.html"; // Yönlendirme
    } else {
      alert("❌🔒❌");
    }
  });
});
