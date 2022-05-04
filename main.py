import os
import smtplib

from flask import Flask, render_template, url_for, redirect, request
from flask_login import login_fresh

my_email = os.environ.get('EMAIL_INFO')
my_password = os.environ.get('EMAIL_PASS')

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/sendinfo', methods = ["POST"])
def send_email():
    try:
        client_name = request.form.get('name')
        client_email = request.form.get('email')
        client_phone = request.form.get('number')
        client_message = request.form.get('client-message')
        client_company = request.form.get('company')
        connection = smtplib.SMTP("smtp.gmail.com")
        connection.starttls()
        connection.login(user=my_email, password=my_password)
        try:
            connection.sendmail(from_addr = my_email,
                            to_addrs = "carlos.oran15@hotmail.com", 
                            msg = "Subject:New Message via Portfolio Form.\n\n"
                            f"Name: {client_name}, my email: {client_email}; Company Name: {client_company}. Here is my phone: {client_phone}. {client_name} says '\n{client_message}'.")
        except:
            connection.sendmail(from_addr = my_email,
                            to_addrs = "carlos.oran15@hotmail.com", 
                            msg = "Subject:New Message via Portfolio Form.\n\n"
                            f"Name:{client_name}. My email:{client_email}. Here is my phone: {client_phone}.{client_name} says '\n{client_message}'.")
        return render_template('success.html')

    except:
        print('something went wrong')
        return "<p>Something went wrong</p>"

if __name__ == '__main__':
    app.run(debug=True)