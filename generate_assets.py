import os
import numpy as np
from PIL import Image

os.makedirs('assets', exist_ok=True)

# Generate WEBP images (approx 75KB - 85KB)
for name in ['hero-bg.webp', 'smart-home.webp', 'security-camera.webp', 'mobile-app.webp', 'panel.webp', 'outdoor-cam.webp', 'indoor-cam.webp', 'doorbell.webp', 'locks.webp', 'sensors.webp', 'thermostat.webp', 'hub.webp', 'monitoring.webp', 'installation.webp', 'pricing-bg.webp']:
    width, height = 1200, 800
    noise = np.random.randint(0, 255, (height, width, 3), dtype=np.uint8)
    img = Image.fromarray(noise)
    img.save(os.path.join('assets', name), 'WEBP', quality=95)
    size = os.path.getsize(os.path.join('assets', name))
    print(f"Created {name}, Size: {size/1024:.2f} KB")

# For MP4, we will just download a small sample video using powershell separately.
