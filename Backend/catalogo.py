# catalogo.py
import mysql.connector
from mysql.connector import errorcode

class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            descripcion VARCHAR(255) NOT NULL,
            cantidad INT NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            proveedor INT(4))''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    def agregar_producto(self, descripcion, cantidad, precio, imagen, proveedor):
        sql = "INSERT INTO productos (descripcion, cantidad, precio, imagen_url, proveedor) VALUES (%s, %s, %s, %s, %s)"
        valores = (descripcion, cantidad, precio, imagen, proveedor)
        self.cursor.execute(sql, valores)        
        self.conn.commit()
        return self.cursor.lastrowid

    def consultar_producto(self, codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
        sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, proveedor = %s WHERE codigo = %s"
        valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos

    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def buscar_por_nombre(self,nombre):
        sql="SELECT * FROM productos WHERE descripcion LIKE %s"
        valor = (f"%{nombre}%",)
        self.cursor.execute(sql, valor)
        return self.cursor.fetchall()
