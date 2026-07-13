import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all mobile-logins
    content = re.sub(r'  <li class="mobile-login".*?</li>\n', '', content)
    
    # Re-insert only the first one
    pattern = r'(<li><a href="Plans-Pricing\.html"[^>]*>Plans & Pricing</a></li>\s*)</ul>'
    replacement = r'\g<1>  <li class="mobile-login"><a href="login.html" class="btn-login" style="background-color: var(--color-white); color: var(--color-black);">Login</a></li>\n      </ul>'
    content = re.sub(pattern, replacement, content, count=1)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
