from flask import Flask, send_file, make_response
import pandas as pd

app = Flask(__name__)

@app.route('/hello/', methods=['GET'])
def welcome():
    return "Hello World!"

@app.route('/data/', methods=['GET'])
def print_data():
    miso_data = pd.read_csv('data/miso_test_data/march_2024.csv')

    resp = make_response(miso_data.to_json())
    resp.headers["Content-Disposition"] = "attachment; filename=miso_test.json"
    resp.headers["Content-Type"] = "text/json"
    return resp
    # return send_file(miso_data.to_csv(), as_attachment=True, download_name="test_miso.csv")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)