from flask import Flask, make_response, request
from flask_cors import CORS  # Import CORS from flask_cors
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins


@app.route('/hello/', methods=['GET'])
def welcome():
    return "Hello World!"


@app.route('/data/', methods=['GET'])
def print_data():
    miso_data = pd.read_csv('data/miso_test_data/march_2024.csv')
    passed_start_timestamp = request.args.get('start_timestamp')
    passed_end_timestamp = request.args.get('end_timestamp')
    passed_cols = request.args.getlist('cols')
    if (passed_cols) and ('timestamp-est' not in passed_cols):
        passed_cols.append('timestamp-est')
    bad_start = False
    bad_end = False
    bad_cols = False

    bad_start_message = "Bad start date. Please format as 'YYYY-MM-DD-HH-MM'"
    bad_end_message = "Bad end date. Please format as 'YYYY-MM-DD-HH-MM'"
    bad_col_message = f"Bad columns. Please ensure passed columns are a subset of {','.join(miso_data.columns.to_list())}"
    start_and_end_date_message = "Start and end date both required"

    if not set(passed_cols).issubset(set(miso_data.columns.tolist())) and passed_cols is not None:
        bad_cols = True

    if (passed_start_timestamp == None) != (passed_end_timestamp == None):
        response_msg = start_and_end_date_message + \
            (bad_col_message if bad_cols else '')
        return make_response(response_msg, 400)

    try:
        parsed_start_timestamp = pd.to_datetime(
            passed_start_timestamp, format='%Y-%m-%d-%H-%M')
    except:
        bad_start = True
    try:
        parsed_end_timestamp = pd.to_datetime(
            passed_end_timestamp, format='%Y-%m-%d-%H-%M')

    except:
        bad_end = True

    if bad_start or bad_end or bad_cols:
        response_msg = (bad_col_message if bad_cols else '') + (
            bad_start_message if bad_start else '') + (bad_end_message if bad_end else '')
        return make_response(response_msg, 400)

    if passed_start_timestamp:
        miso_data['timestamp-est-str'] = pd.to_datetime(
            miso_data['timestamp-est'], format='%Y-%m-%d %H:%M:%S')
        miso_data = miso_data[miso_data['timestamp-est-str'] <= parsed_end_timestamp]
        miso_data = miso_data[miso_data['timestamp-est-str'] >= parsed_start_timestamp]
        miso_data.drop('timestamp-est-str', axis=1)

    if passed_cols:
        miso_data = miso_data[passed_cols]

    # Return JSON response
    return miso_data.to_json(orient='records')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


# http://127.0.0.1:5000/data/?cols=load-mw&cols=emissions_intensity&start_timestamp=2024-03-02-16-05&end_timestamp=2024-03-03-16-05