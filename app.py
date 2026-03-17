from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
import rembg
from PIL import Image
import io
import base64
import sys
import traceback

# Use the lighter u2netp model
print("Loading rembg session...")
session = rembg.new_session('u2netp')
print("Session loaded successfully!")

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')

@app.route('/api/remove-background', methods=['POST'])
def remove_background():
    try:
        print("Received request")
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        print(f"Got image data, length: {len(data['image'])}")
        
        # Decode base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        print(f"Base64 length after split: {len(image_data)}")
        
        image_bytes = base64.b64decode(image_data)
        print(f"Decoded bytes length: {len(image_bytes)}")
        
        # Remove background using preloaded session
        print("Starting background removal...")
        output_bytes = rembg.remove(image_bytes, session=session)
        print(f"Removal done, output bytes: {len(output_bytes)}")
        
        # Convert back to base64
        output_base64 = base64.b64encode(output_bytes).decode('utf-8')
        output_data_url = f'data:image/png;base64,{output_base64}'
        print("Returning result")
        
        return jsonify({'result': output_data_url})
    except Exception as e:
        print(f"Error occurred: {e}", file=sys.stderr)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
