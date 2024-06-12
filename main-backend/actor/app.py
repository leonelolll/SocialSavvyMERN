from flask import Flask, request, jsonify
import subprocess
import json
import os

app = Flask(__name__)

@app.route('/fetch-instagram-data', methods=['POST'])
def fetch_instagram_data():
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    # Call the fetchInstagram script
    try:
        result = subprocess.run(
            ['python', 'fetchInstagram.py', username],
            capture_output=True,
            text=True
        )
        if result.returncode != 0:
            return jsonify({'error': 'Failed to fetch data from Instagram'}), 500
        
        # Read the results.json file
        with open('Backend/result.json', 'r') as file:
            results = json.load(file)
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
