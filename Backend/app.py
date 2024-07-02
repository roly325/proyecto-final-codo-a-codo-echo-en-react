# app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time

from catalogo import Catalogo

app = Flask(__name__)
CORS(app)

catalogo = Catalogo(host='Roli325.mysql.pythonanywhere-services.com', user='Roli325', password='Roli36487874', database='Roli325$miapp')
# Creación de instancia de Catalogo
#catalogo = Catalogo(host='localhost', user='root', password='root', database='miapp')

#RUTA_DESTINO = './Backend/static/imagenes/'
RUTA_DESTINO = '/home/Roli325/mysite/static/imagenes'


@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = catalogo.listar_productos()
    return jsonify(productos)

@app.route("/productos/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    producto = catalogo.consultar_producto(codigo)
    if producto:
        return jsonify(producto), 200
    else:
        return "Producto no encontrado", 404

@app.route("/productos", methods=["POST"])
def agregar_producto():
    descripcion = request.form['descripcion']
    cantidad = request.form['cantidad']
    precio = request.form['precio']
    imagen = request.files['imagen']
    proveedor = request.form['proveedor']
   
    if float(cantidad) < 0 or float(precio) < 0:
        return jsonify({"mensaje": "La cantidad y el precio no pueden ser negativos."}), 400
    #Generar nombre único para la imagen
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
     # Agregar producto al catálogo
    nuevo_codigo = catalogo.agregar_producto(descripcion, cantidad, precio, nombre_imagen, proveedor)
    if nuevo_codigo:
        if not os.path.exists(RUTA_DESTINO):
            os.makedirs(RUTA_DESTINO)
        imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
        return jsonify({"mensaje": "Producto agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al agregar el producto."}), 500

@app.route("/productos/<int:codigo>", methods=["PUT"])
def modificar_producto(codigo):
    nueva_descripcion = request.form.get("descripcion")
    nueva_cantidad = request.form.get("cantidad")
    nuevo_precio = request.form.get("precio")
    nuevo_proveedor = request.form.get("proveedor")
    # Validar que la cantidad y el precio no sean negativos
    if float(nueva_cantidad) < 0 or float(nuevo_precio) < 0:
        return jsonify({"mensaje": "La cantidad y el precio no pueden ser negativos."}), 400
    # Manejo de imagen si se envía una nueva
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
        producto = catalogo.consultar_producto(codigo)
    # Eliminar la imagen anterior si existe 
        if producto:
            imagen_vieja = producto["imagen_url"]
            ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
    else:
    #mantener imagen actual
        producto = catalogo.consultar_producto(codigo)
        if producto:
            nombre_imagen = producto["imagen_url"]
    # Modificar el producto en el catálogo
    if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nuevo_proveedor):
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 403

@app.route("/productos/<int:codigo>", methods=["DELETE"])
def eliminar_producto(codigo):
    producto = catalogo.consultar_producto(codigo)
    if producto:
        #eliminar imagen asociada al producto
        imagen_vieja = producto["imagen_url"]
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)
        #elimar el produto del catalogo
        if catalogo.eliminar_producto(codigo):
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el producto"}), 500
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404
    
@app.route("/productos/buscar", methods=["GET"])
def buscar_productos():
    nombre = request.args.get('nombre')
    if nombre:
        # Buscar productos por nombre en el catálogo
        productos = catalogo.buscar_por_nombre(nombre)
        if productos:
            return jsonify(productos), 200
        else:
            return jsonify({"mensaje": "No se encontraron productos con ese nombre."}), 404
    else:
        return jsonify({"mensaje": "Nombre de producto no proporcionado"}), 400

if __name__ == "__main__":
    app.run(debug=True)
