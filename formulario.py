from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Crear la app Flask
app = Flask(__name__, template_folder='templates')# Especificamos que las plantillas están en templates/html

# Configuración del servidor de correo
app.secret_key = os.getenv('FLASK_SECRET_KEY', '123')
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']

# Configurar Flask-Mail
mail = Mail(app)

# Ruta para la página de inicio (index)
@app.route('/')
def index():
    return render_template('index.html')  # Renderiza index.html desde la carpeta 'html'

# Ruta para la página "Acerca de"
@app.route('/about')
def about():
    return render_template('about.html')  # Renderiza about.html desde la misma carpeta

# Ruta para la página "Contacto"
@app.route('/contact')
def contact():
    return render_template('contact.html')  # Renderiza contact.html desde la misma carpeta

# Ruta para la página "productos"
@app.route('/product')
def product():
    return render_template('product.html')  # Renderiza product.html desde la misma carpeta


# Ruta para enviar el correo
@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        # Obtener los datos del formulario
        nombre = request.form['name']
        correo = request.form['email']
        asunto = request.form['subject']
        mensaje = request.form['message']

        # Crear el mensaje
        msg = Message(
            subject=f"Nuevo mensaje de contacto: {asunto}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']]
        )
        msg.body = f"Nombre: {nombre}\nCorreo: {correo}\nMensaje: {mensaje}"

        # Enviar el mensaje
        mail.send(msg)

        # Responder con un mensaje JSON
        return jsonify({"message": "Mensaje enviado correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Ocurrió un error al enviar el mensaje. Intenta de nuevo."}), 500

if __name__ == '__main__':
    app.run(debug=True)
