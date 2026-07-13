import os
from PIL import Image
import io

os.makedirs('assets', exist_ok=True)

target_size = 80 * 1024 # 80KB

for name in ['hero-bg.webp', 'smart-home.webp', 'security-camera.webp', 'mobile-app.webp', 'panel.webp', 'outdoor-cam.webp', 'indoor-cam.webp', 'doorbell.webp', 'locks.webp', 'sensors.webp', 'thermostat.webp', 'hub.webp', 'monitoring.webp', 'installation.webp', 'pricing-bg.webp']:
    width, height = 800, 600
    img = Image.new('RGB', (width, height), color = (0, 45, 90)) # Use primary color
    
    buf = io.BytesIO()
    img.save(buf, format='WEBP', quality=80)
    
    current_size = buf.tell()
    if current_size < target_size:
        padding = b'\0' * (target_size - current_size)
    else:
        padding = b''
        
    with open(os.path.join('assets', name), 'wb') as f:
        f.write(buf.getvalue() + padding)
    
    size = os.path.getsize(os.path.join('assets', name))
    print(f"Created {name}, Size: {size/1024:.2f} KB")
