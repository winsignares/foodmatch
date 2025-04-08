from flask import Flask, request, redirect, render_template
from config.db import app

@app.route("/")
def index():
    return render_template("index.html")

if __name__=="__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")