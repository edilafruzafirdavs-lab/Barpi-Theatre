const seat = document.createElement("div");

// Настройка текста
seat.textContent = "A5";

// Добавление CSS-класса
seat.classList.add("seat");

// Установка атрибута
seat.setAttribute("data-seat-id", 15);

// Можно использовать dataset
seat.dataset.row = 1;
seat.dataset.number = 5;

// Настройка стиля
seat.style.width = "40px";
seat.style.height = "40px";

seat.style.backgroundColor = 'red'

// Обработка нажатия
seat.addEventListener("click", () => {
    seat.classList.toggle("selected");

    console.log(
        "Ряд:", seat.dataset.row,
        "Место:", seat.dataset.number
    );
});

// Добавление на страницу
const hall = document.getElementById("hall");
hall.appendChild(seat);