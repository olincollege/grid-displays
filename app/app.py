from flask import Flask, make_response, request
import pandas as pd


app = Flask(__name__)

@app.route('/hello/', methods=['GET'])
def welcome():
    return "Hello World!"

@app.route('/data/', methods=['GET'])
def print_data():
    miso_data = pd.read_csv('data/miso_test_data/march_2024.csv')
    passed_start_date = request.args.get('start_date')
    passed_end_date = request.args.get('end_date')
    passed_cols = request.args.getlist('cols')
    if (passed_cols) and ('date-est' not in passed_cols):
        passed_cols.append('date-est')
    bad_start = False
    bad_end = False
    bad_cols = False

    bad_start_message = "Bad start date. Please format as 'YYYY-MM-DD'"
    bad_end_message = "Bad end date. Please format as 'YYYY-MM-DD'"
    bad_col_message = f"Bad columns. Please ensure passed columns are a subset of {','.join(miso_data.columns.to_list())}"
    start_and_end_date_message = "Start and end date both required"

    if not set(passed_cols).issubset(set(miso_data.columns.tolist())) and passed_cols is not None:
        bad_cols = True

    if (passed_start_date == None) != (passed_end_date == None):
        response_msg = start_and_end_date_message + (bad_col_message if bad_cols else '')
        return make_response(response_msg, 400)

    try:
        parsed_start_date = pd.to_datetime(passed_start_date, format='%Y-%m-%d').date()
    except:
        bad_start = True
    try:
        parsed_end_date = pd.to_datetime(passed_end_date, format='%Y-%m-%d').date()

    except:
        bad_end = True

    if bad_start or bad_end or bad_cols:
        response_msg = (bad_col_message if bad_cols else '') + (bad_start_message if bad_start else '') + (bad_end_message if bad_end else '')
        return make_response(response_msg, 400)


    miso_data['date-est-str'] = pd.to_datetime(miso_data['date-est'], format='%Y-%m-%d').dt.date
    miso_data = miso_data[miso_data['date-est-str'] <= parsed_end_date]
    miso_data = miso_data[miso_data['date-est-str'] >= parsed_start_date]
    miso_data.drop('date-est-str', axis=1)

    if passed_cols:
        miso_data = miso_data[passed_cols]

    resp = make_response(miso_data.to_json())
    resp.headers["Content-Disposition"] = "attachment; filename=miso_test.json"
    resp.headers["Content-Type"] = "text/json"
    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)