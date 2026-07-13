import os
from PIL import Image

def convert_to_webp(src_path, dest_path, target_min=70*1024, target_max=90*1024):
    img = Image.open(src_path).convert("RGB")
    
    # Target resolution width (e.g. 1920)
    w, h = img.size
    aspect = h / w
    new_w = 1920
    new_h = int(new_w * aspect)
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    quality = 90
    while quality > 10:
        img.save(dest_path, "WEBP", quality=quality)
        size = os.path.getsize(dest_path)
        if size <= target_max:
            if size >= target_min:
                print(f"Success! {dest_path} is {size/1024:.2f} KB at quality {quality}")
                return
            elif quality == 90:
                print(f"Warning: {dest_path} is {size/1024:.2f} KB (under min) at max quality.")
                return
            else:
                pass
            
        quality -= 5
    print(f"Saved {dest_path} at size {os.path.getsize(dest_path)/1024:.2f} KB (Quality {quality})")

artifacts_dir = r"C:\Users\YUKESH G\.gemini\antigravity\brain\ca734f71-1dd1-42c3-809d-419d6d9a8f5b"
assets_dir = r"assets"

files = [
    ("pkg_cover_1783936423984.png", "pkg_cover.webp"),
    ("prod_cover_1783936434512.png", "prod_cover.webp"),
    ("serv_cover_1783936445550.png", "serv_cover.webp"),
    ("plan_cover_1783936457804.png", "plan_cover.webp")
]

for src_name, dest_name in files:
    src_path = os.path.join(artifacts_dir, src_name)
    dest_path = os.path.join(assets_dir, dest_name)
    if os.path.exists(src_path):
        convert_to_webp(src_path, dest_path)
    else:
        print(f"File not found: {src_path}")
