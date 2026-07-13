import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace the icon with span bars if it hasn't been done yet
    if '<i class="fas fa-bars"></i>' in content:
        content = content.replace('<i class="fas fa-bars"></i>', '<span class="bar"></span><span class="bar"></span><span class="bar"></span>')
        
    # 2. Insert mobile login button inside nav-links
    if 'mobile-login' not in content:
        pattern = r'(<li><a href="Plans-Pricing\.html"[^>]*>Plans & Pricing</a></li>\s*)</ul>'
        replacement = r'\g<1>  <li class="mobile-login"><a href="login.html" class="btn-login" style="background-color: var(--color-white); color: var(--color-black);">Login</a></li>\n      </ul>'
        content = re.sub(pattern, replacement, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
