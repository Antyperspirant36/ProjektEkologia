from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def search_product(product_name):
    conn = sqlite3.connect('airquality.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE name=?", (product_name,))
    results = cursor.fetchall()
    conn.close()
    return results


@app.route('/products', methods=['GET'])
def get_products():
    product_name = request.args.get('product_name')
    if not product_name:
        return jsonify({'error': 'Product name is required'})
    results = search_product(product_name)
    if not results:
        return jsonify({'error': 'Product not found'})
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)