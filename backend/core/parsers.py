import csv
import json
import io
from datetime import datetime
from decimal import Decimal

def parse_sap_csv(file_content, tenant, job):
    """
    Parses SAP CSV with German headers: MANDT, BUDAT, WERKS, MATNR, MENGE, MEINS, WRBTR
    BUDAT format: %d.%m.%Y
    Sets category to SCOPE_1
    """
    decoded_file = file_content.decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    records = []

    for row in reader:
        anomaly_reason = []
        status = 'UNREVIEWED'
        
        try:
            # Parse German date
            budat = datetime.strptime(row['BUDAT'], '%d.%m.%Y')
            menge = Decimal(row['MENGE'])
            wrbtr = Decimal(row['WRBTR'])
            
            # Anomaly check: Unit Price
            if menge > 0:
                unit_price = wrbtr / menge
                if unit_price > 500: # Threshold for "abnormally high"
                    status = 'SUSPICIOUS'
                    anomaly_reason.append(f"High unit price: {unit_price}")
            
            records.append({
                'tenant': tenant,
                'job': job,
                'raw_payload': row,
                'status': status,
                'category': 'SCOPE_1',
                'raw_quantity': menge,
                'unit': row['MEINS'],
                'anomaly_reason': '; '.join(anomaly_reason) if anomaly_reason else None
            })
        except Exception as e:
            records.append({
                'tenant': tenant,
                'job': job,
                'raw_payload': row,
                'status': 'SUSPICIOUS',
                'anomaly_reason': f"Parsing error: {str(e)}"
            })
    return records

def parse_utility_csv(file_content, tenant, job):
    """
    Parses Utility CSV: Account_Number, Service_Start, Service_End, Usage_kWh
    Sets category to SCOPE_2
    """
    decoded_file = file_content.decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    records = []

    for row in reader:
        anomaly_reason = []
        status = 'UNREVIEWED'
        
        try:
            start_date = row.get('Service_Start')
            end_date = row.get('Service_End')
            usage = row.get('Usage_kWh')
            
            if not start_date or not end_date:
                status = 'SUSPICIOUS'
                anomaly_reason.append("Missing service dates")
            
            usage_val = Decimal(usage) if usage else Decimal(0)
            if usage_val > 5000: # Example spike threshold
                status = 'SUSPICIOUS'
                anomaly_reason.append("Usage spike detected")
                
            records.append({
                'tenant': tenant,
                'job': job,
                'raw_payload': row,
                'status': status,
                'category': 'SCOPE_2',
                'raw_quantity': usage_val,
                'normalized_quantity': usage_val,
                'unit': 'kWh',
                'anomaly_reason': '; '.join(anomaly_reason) if anomaly_reason else None
            })
        except Exception as e:
            records.append({
                'tenant': tenant,
                'job': job,
                'raw_payload': row,
                'status': 'SUSPICIOUS',
                'anomaly_reason': f"Parsing error: {str(e)}"
            })
    return records

def parse_travel_json(json_content, tenant, job):
    """
    Parses Travel JSON array: origin_airport, destination_airport, booking_class, spend_usd
    Sets category to SCOPE_3
    """
    data = json.loads(json_content)
    records = []

    for trip in data:
        anomaly_reason = []
        status = 'UNREVIEWED'
        
        origin = trip.get('origin_airport')
        dest = trip.get('destination_airport')
        
        if not origin or len(origin) != 3:
            status = 'SUSPICIOUS'
            anomaly_reason.append(f"Invalid origin airport IATA: {origin}")
            
        if not dest or len(dest) != 3:
            status = 'SUSPICIOUS'
            anomaly_reason.append(f"Invalid destination airport IATA: {dest}")
            
        records.append({
            'tenant': tenant,
            'job': job,
            'raw_payload': trip,
            'status': status,
            'category': 'SCOPE_3',
            'raw_quantity': Decimal(str(trip.get('spend_usd', 0))),
            'unit': 'USD',
            'anomaly_reason': '; '.join(anomaly_reason) if anomaly_reason else None
        })
    return records
