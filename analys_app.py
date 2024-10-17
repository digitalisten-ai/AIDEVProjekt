from flask import Flask, jsonify, request
from flask_cors import CORS
from sales_data import SalesData

app = Flask(__name__)
CORS(app)

# Ladda in datan
sales_data = SalesData('bandcamp_raw_data_Hypnotica-Records.csv')

# API-route för top-artister
@app.route('/api/top_artists', methods=['GET'])
def get_top_artists():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    top_artists = sales_data.top_artists(start_date, end_date)
    return jsonify(top_artists.to_dict(orient='records'))

# API-route för top-countries
@app.route('/api/top_countries', methods=['GET'])
def get_top_countries():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    top_countries = sales_data.top_countries(start_date, end_date)
    return jsonify(top_countries.to_dict(orient='records'))

# API-route för top-albums
@app.route('/api/top_albums', methods=['GET'])
def get_top_albums():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    top_albums = sales_data.top_albums(start_date, end_date)
    return jsonify(top_albums.to_dict(orient='records'))

# API-route för top-tracks
@app.route('/api/top_tracks', methods=['GET'])
def get_top_tracks():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    top_tracks = sales_data.top_tracks(start_date, end_date)
    return jsonify(top_tracks.to_dict(orient='records'))

# API-route för försäljning över tid
@app.route('/api/sales_over_time', methods=['GET'])
def get_sales_over_time():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    sales_over_time = sales_data.sales_over_time(start_date, end_date)
    return jsonify(sales_over_time.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Lägg till port 5001
