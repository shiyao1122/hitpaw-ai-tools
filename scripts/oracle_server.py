from flask import Flask, request, jsonify
from oracle_api import generate_astrology_content
import os

app = Flask(__name__)

@app.route('/api/oracle', methods=['POST'])
def oracle():
    data = request.json
    prompt = data.get('prompt')
    content_type = data.get('type', 'image')
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        url = generate_astrology_content(prompt, type=content_type)
        return jsonify({"url": url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("ORACLE_SERVER_PORT", 5001))
    app.run(host='0.0.0.0', port=port)
