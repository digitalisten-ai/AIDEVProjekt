import pandas as pd

class SalesData:
    def __init__(self, file_path):
        # Ladda in datan från CSV-filen och konvertera datumfältet till datetime-format
        self.data = pd.read_csv(file_path)
        self.data['date'] = pd.to_datetime(self.data['date'], errors='coerce')
        self.data.dropna(subset=['date'], inplace=True)  # Ta bort rader utan giltigt datum

    # Totala försäljningar
    def total_sales(self):
        return self.data['sub total'].sum()

    # Top artister baserat på quantity 
    def top_artists(self, start_date=None, end_date=None):
        data = self.filter_by_date_range(start_date, end_date)
        return data.groupby('artist')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Top länder baserat på quantity, för stapeldiagram
    def top_countries(self, start_date=None, end_date=None):
        data = self.filter_by_date_range(start_date, end_date)
        return data.groupby('buyer country name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Top album baserat på quantity
    def top_albums(self, start_date=None, end_date=None):
        data = self.filter_by_date_range(start_date, end_date)
        albums_data = data[data['item type'] == 'album']
        return albums_data.groupby('item name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Top tracks baserat på quantity 
    def top_tracks(self, start_date=None, end_date=None):
        data = self.filter_by_date_range(start_date, end_date)
        tracks_data = data[data['item type'] == 'track']
        return tracks_data.groupby('item name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Filtrerar datan baserat på start- och slutdatum
    def filter_by_date_range(self, start_date=None, end_date=None):
        filtered_data = self.data
        if start_date:
            filtered_data = filtered_data[filtered_data['date'] >= pd.to_datetime(start_date)]
        if end_date:
            filtered_data = filtered_data[filtered_data['date'] <= pd.to_datetime(end_date)]
        return filtered_data

    # Ny funktion för linjediagram som visar försäljning över tid baserat på quantity
    def sales_over_time(self, start_date=None, end_date=None):
        data = self.filter_by_date_range(start_date, end_date)
        # Gruppar per dag och summerar quantity per datum
        sales_over_time = data.groupby(data['date'].dt.to_period('D'))['quantity'].sum().reset_index()
        # Konverterar period tillbaka till datum för linjediagrammet
        sales_over_time['date'] = sales_over_time['date'].dt.to_timestamp()
        return sales_over_time
