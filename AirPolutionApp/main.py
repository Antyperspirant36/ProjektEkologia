import requests
import math

# Ustawienie klucza API
api_key = '6f8c6c7c361c24c67487eafa3c9fd48d'


# Funkcja do pobrania danych o jakości powietrza z API
def get_air_pollution_data(lat, lon):
    # Tworzenie URL na podstawie podanych współrzędnych
    air_pollution_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"

    try:
        response = requests.get(air_pollution_url)

        # Sprawdzanie, czy odpowiedź jest prawidłowa
        response.raise_for_status()
        data = response.json()
        print('Pełna odpowiedź z API (jakość powietrza):', data)

        # Przetwarzanie i wyświetlanie danych o jakości powietrza
        air_quality_index = data['list'][0]['main']['aqi']
        components = data['list'][0]['components']

        print(f"Air Quality Index (AQI): {air_quality_index}")
        print(f"CO (Carbon monoxide): {components['co']} µg/m³")
        print(f"NO (Nitrogen monoxide): {components['no']} µg/m³")
        print(f"NO₂ (Nitrogen dioxide): {components['no2']} µg/m³")
        print(f"O₃ (Ozone): {components['o3']} µg/m³")
        print(f"SO₂ (Sulphur dioxide): {components['so2']} µg/m³")
        print(f"PM₂.₅ (Fine particles): {components['pm2_5']} µg/m³")
        print(f"PM₁₀ (Coarse particulate matter): {components['pm10']} µg/m³")
        print(f"NH₃ (Ammonia): {components['nh3']} µg/m³")

    except requests.exceptions.RequestException as e:
        print('Błąd w pobieraniu danych o jakości powietrza:', e)


# Funkcja do pobrania współrzędnych geograficznych miasta z API
def get_city_coordinates(city_name, state_code='', country_code='', limit=''):
    # Tworzenie URL na podstawie nazwy miasta i kodu kraju
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&limit={limit}&appid={api_key}"

    try:
        response = requests.get(geo_url)

        # Sprawdzanie, czy odpowiedź jest prawidłowa
        response.raise_for_status()
        data = response.json()
        print('Pełna odpowiedź z API (współrzędne miasta):', data)

        # Sprawdzenie, czy otrzymano jakieś wyniki
        if not data:
            print(f"Brak wyników dla lokalizacji: {city_name}")
            return

        # Wyciąganie współrzędnych i zaokrąglanie do liczby całkowitej
        lat = round(data[0]['lat'])
        lon = round(data[0]['lon'])
        print(f"Zaokrąglone współrzędne miasta {city_name}:")
        print(f"Szerokość geograficzna: {lat}")
        print(f"Długość geograficzna: {lon}")

        # Wywołanie funkcji get_air_pollution_data z zaokrąglonymi współrzędnymi
        get_air_pollution_data(lat, lon)

    except requests.exceptions.RequestException as e:
        print('Błąd w pobieraniu współrzędnych miasta:', e)


# Wywołanie funkcji do pobrania współrzędnych miasta i jakości powietrza
get_city_coordinates('Kraków', '', 'PL')
