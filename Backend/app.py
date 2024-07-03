from flask import Flask, jsonify
from flask_cors import CORS
from catalogo_rutas import productos_bp  # Asegúrate de importar tu blueprint productos_bp desde catalogo.py

app = Flask(__name__)
CORS(app)

# Registrar el blueprint productos_bp en la aplicación
app.register_blueprint(productos_bp)


if __name__ == "__main__":
    app.run(debug=True)
