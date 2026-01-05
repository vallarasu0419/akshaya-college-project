fetch("/api/students")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("students");
    container.innerHTML = data.map(student => `
      <div class="card" onclick="window.location.href='/student/${student.id}'">
        <img src="${student.photo}" alt="${student.name}">
        <h3>${student.name}</h3>
      </div>
    `).join("");
  })
  .catch(err => console.error("Error fetching students:", err));
