document.addEventListener("DOMContentLoaded", () => {
  const userTable = document.getElementById("userTable");

  async function fetchUserData() {
    try {
      const response = await fetch("getUserData.php");
      const userData = await response.json();

      userTable.innerHTML = "";
      userData.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.ip}</td>
          <td>${user.login}</td>
          <td>${user.key}</td>
          <td>${user.isBlocked ? "Engelli" : "Aktif"}</td>
          <td>
            <button class="block-btn" onclick="blockUser('${user.ip}')">Engelle</button>
            <button class="unblock-btn" onclick="unblockUser('${user.ip}')">Engeli Kaldır</button>
          </td>
        `;

        userTable.appendChild(row);
      });
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  }

  async function blockUser(ip) {
    try {
      await fetch("blockUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      alert("Kullanıcı engellendi.");
      fetchUserData();
    } catch (error) {
      console.error("Engelleme hatası:", error);
    }
  }

  async function unblockUser(ip) {
    try {
      await fetch("unblockUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      alert("Kullanıcının engeli kaldırıldı.");
      fetchUserData();
    } catch (error) {
      console.error("Engel kaldırma hatası:", error);
    }
  }

  fetchUserData();
});
