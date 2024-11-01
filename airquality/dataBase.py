import sqlite3

conn = sqlite3.connect("airquality.db")
cursor = conn.cursor()

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