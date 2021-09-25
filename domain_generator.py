from flask import (Flask, got_request_exception, render_template, request,
                   url_for)
app = Flask(__name__)

@app.route("/checkout", methods=['GET', 'POST'])
def checkout():
    if request.method == 'GET':
        return render_template("checkout.html")

    if request.method == 'POST':
        print("data query request output")
        print(request.form)
        return render_template("confirmed.html")



app.run(host='0.0.0.0', port=5000)