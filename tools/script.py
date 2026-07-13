import urllib.request
import re
import json

url = 'https://www.pexels.com/search/videos/security%20camera/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'https://videos.pexels.com/video-files/[^/]+/[^"\'\s]+\.mp4', html)
    if links:
        print('Found URL:', links[0])
    else:
        print('No MP4 links found in standard regex.')
except Exception as e:
    print('Error:', e)
