const sqlite3 = require('sqlite3').verbose();

// Tworzenie lub otwieranie pliku `products.db`
let db = new sqlite3.Database('products.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Połączono z bazą danych products.db');
});

// Tworzenie tabeli `products`
db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            price REAL,
            category TEXT
        )`, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Tabela products została utworzona.');
});

// Dodanie przykładowych produktów
const airquality = [
    ['Plastik', 'WOWE'],
    ['Papier i tektura', 'WOWE'],
    ['Metal', 'WOWE'],
    ['Szkło','WOWE'],
    ['Odpady organiczne', 'WOWE'],
    ['Elektronika', 'WOWE'],
    ['Baterie', 'WOWE'],
    ['Inne', 'WOWE'],
];

products.forEach(product => {
    db.run(`INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)`, product, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Dodano produkt: ${product[0]}`);
    });
});

// Zamknięcie połączenia z bazą danych
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Zamknięto połączenie z bazą danych');
});
