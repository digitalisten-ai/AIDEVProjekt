import pandas as pd

class SalesData:
    def __init__(self, file_path):
        self.data = pd.read_csv(file_path)
    
    # Totala försäljningar
    def total_sales(self):
        return self.data['sub total'].sum()
    
    # Top artister baserat på quantity 
    def top_artists(self):
        return self.data.groupby('artist')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)
    
    # Top länder baserat på quantity 
    def top_countries(self):
        return self.data.groupby('buyer country name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Top album baserat på quantity
    def top_albums(self):
        return self.data[self.data['item type'] == 'album'].groupby('item name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)

    # Top tracks baserat på quantity 
    def top_tracks(self):
        return self.data[self.data['item type'] == 'track'].groupby('item name')['quantity'].sum().reset_index().sort_values(by='quantity', ascending=False).head(10)
