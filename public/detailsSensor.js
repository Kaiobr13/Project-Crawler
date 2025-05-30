document.addEventListener("DOMContentLoaded", () => {
  fetch("/sensors/Sensorlogs") // a URL da sua rota GET que retorna os dados
    .then(res => {
      if (!res.ok) throw new Error("Erro na requisição");
      return res.json();
    })
    .then(data => {
      const tabela = document.getElementById("detalhes-tabela");
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="px-4 py-2">${item.sd_id}</td>
          <td class="px-4 py-2">${item.device_id}</td>
          <td class="px-4 py-2">${item.sensor}</td>
          <td class="px-4 py-2">${item.value}</td>
          <td class="px-4 py-2">${item.topic}</td>
          <td class="px-4 py-2">${new Date(item.received_at).toLocaleString()}</td>
        `;
        tabela.appendChild(row);
      });
    })
    .catch(err => console.error("Erro ao carregar dados:", err));
});
