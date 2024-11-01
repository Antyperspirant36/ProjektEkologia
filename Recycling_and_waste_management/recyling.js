const truck = document.getElementById("truck");
const trashItems = document.querySelectorAll(".trash");

// Funkcja do sprawdzania kolizji
function isColliding(truck, trash) {
    const truckRect = truck.getBoundingClientRect();
    const trashRect = trash.getBoundingClientRect();

    return !(
        truckRect.top > trashRect.bottom ||
        truckRect.bottom < trashRect.top ||
        truckRect.left > trashRect.right ||
        truckRect.right < trashRect.left
    );
}

// Funkcja do obsługi animacji i usuwania śmieci
function checkCollision() {
    trashItems.forEach((trash) => {
        if (isColliding(truck, trash)) {
            trash.style.display = "none"; // Usunięcie śmieci po kolizji
        }
    });
}

// Uruchamiamy sprawdzanie kolizji co 100ms
setInterval(checkCollision, 100);
