document.addEventListener("DOMContentLoaded", () => {
  fetch("/devices/DEVlogs")
    .then(res => res.json())
    .then(devices => {
      const tabela = document.getElementById("detalhes-tabela");
      devices.forEach(d => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="px-4 py-2">${d.device_id}</td>
          <td class="px-4 py-2">${d.device_name}</td>
          <td class="px-4 py-2">${d.device_type}</td>
          <td class="px-4 py-2">${new Date(d.created_at).toLocaleString()}</td>
        `;
        tabela.appendChild(row);
      });
    })
    .catch(console.error);
});
