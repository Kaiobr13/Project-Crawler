document.addEventListener("DOMContentLoaded", () => {
  fetch("/activity/activityLogs")
    .then((res) => res.json())
    .then((data) => {
      const tabela = document.getElementById("detalhes-tabela");
      data.forEach((log) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="px-4 py-2">${log.activitylog_id}</td>
          <td class="px-4 py-2">${log.device_id}</td>
          <td class="px-4 py-2">${log.speed}</td>
          <td class="px-4 py-2">${log.distance}</td>
          <td class="px-4 py-2">${log.duration_seconds}</td>
          <td class="px-4 py-2">${log.weight_g}</td>
          <td class="px-4 py-2">${log.topic}</td>
          <td class="px-4 py-2">${log.raw_payload}</td>
          <td class="px-4 py-2">${new Date(log.recorded_at).toLocaleString()}</td>
        `;
        tabela.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Erro ao buscar logs:", err);
    });
});
