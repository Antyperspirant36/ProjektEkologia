import sqlite3

conn = sqlite3.connect("airquality.db")
cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS airquality (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    description TEXT,
                    price REAL,
                    category TEXT
                )''')

airquality = [
    ('Plastik', 'WOWE'),
    ('Papier i tektura', 'WOWE'),
    ('Metal', 'WOWE'),
    ('Szkło','WOWE'),
    ('Odpady organiczne', 'WOWE'),
    ('Elektronika', 'WOWE'),
    ('Baterie', 'WOWE'),
    ('Inne', 'WOWE'),
]

cursor.executemany("INSERT INTO products VALUES (?, ?)", airquality)
conn.commit()