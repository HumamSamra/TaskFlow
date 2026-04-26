function clearTasks() {
  Swal.fire({
    theme: "dark",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      document.getElementById("tasks-board").innerHTML = "";
      Swal.fire({
        theme: "dark",
        title: "Deleted!",
        text: "Tasks has been deleted",
        icon: "success",
      });
    }
  });
}

function createTask() {
  let modal = document.getElementById("exampleModal");
  let bsModal = bootstrap.Modal.getInstance(modal);
  let input = document.getElementById("task-input");

  if (input.value.trim()) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let newTask = {
      id: Date.now(),
      text: input.value,
      date: new Date().toISOString(),
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
  }
  getTasks();

  bsModal.hide();
}

document.getElementById("search-input").addEventListener("input", (e) => {
  getTasks();
});

function getTasks() {
  const container = document.getElementById("tasks-board");
  container.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let search = document.getElementById("search-input").value;
  if (search) {
    tasks = tasks.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase()),
    );
  }

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-card mb-4";

    div.innerHTML = `
      <div class="icon-container ${task.completed ? "donetask" : ""}">
        <svg viewBox="0 0 512 512" class="icon ${task.completed ? "fill-red" : "fill-white"}">
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z">
          </path>
        </svg>
      </div>

      <div class="message-text-container">
        <p class="message-text ${task.completed ? "checked-txt" : ""}">
          ${task.completed ? "Finished Task" : "On Going Task"}
        </p>
        <p class="sub-text ${task.completed ? "checked-txt" : ""}">
          ${task.text}
        </p>
      </div>
      
    <label class="check-container p-3 bg-check-item">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
  
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="expand bi bi-check2-square" viewBox="0 0 16 16">
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="compress bi bi-hourglass" viewBox="0 0 16 16">
            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2z"/>
        </svg>
    </label>
    `;

    const checkbox = div.querySelector("input");

    checkbox.addEventListener("change", () => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let taskId = task.id;

      let realTask = tasks.find((t) => t.id === taskId);
      if (realTask) {
        realTask.completed = checkbox.checked;
        console.log(realTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const iconContainer = div.querySelector(".icon-container");
        const icon = div.querySelector(".icon");
        const messageTexts = div.querySelectorAll(".message-text, .sub-text");
        const statusText = div.querySelector(".message-text");

        if (checkbox.checked) {
          iconContainer.classList.add("donetask");
          icon.classList.replace("fill-white", "fill-red");
          messageTexts.forEach((el) => el.classList.add("checked-txt"));
          statusText.innerText = "Finished Task";
        } else {
          iconContainer.classList.remove("donetask");
          icon.classList.replace("fill-red", "fill-white");
          messageTexts.forEach((el) => el.classList.remove("checked-txt"));
          statusText.innerText = "On Going Task";
        }
      }
    });

    container.appendChild(div);
  });
}

getTasks();
