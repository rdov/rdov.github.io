#
# Usage: python scripts/patch_imgmaps.py deglet_react
#
# This will patch .html files so the image maps exported from
# OmniGraffle uses dynamic coordinates.
#

import os
import sys
import subprocess

JQUERY = "jquery-1.11.3.min.js"
IMGMAPS = "jquery.rwdImageMaps.min.js"
DOWNLOAD = {
    'rwdimgmap': ("https://raw.githubusercontent.com/stowball/"
                  "jQuery-rwdImageMaps/master/jquery.rwdImageMaps.min.js"),
    'jquery': "http://code.jquery.com/jquery-1.11.3.min.js",
    'tool': 'curl',
    'output': '--output'
}

HEADER = """<html>
  <head>
    <style>
      body {
        margin: 0;
        width: 100%;
        min-width: 1200px;
      }

      img {
        width: 100%;
      }
    </style>
  </head>
  <body>
"""

FOOTER = """
<script src="%s"></script>
<script src="%s"></script>
<script>
  $(document).ready(function() {
    $('img[usemap]').rwdImageMaps();
  });
</script>
</body>
</html>
""" % (JQUERY, IMGMAPS)


def patch(path, name):
    filename = os.path.join(path, name)

    data = open(filename).read()
    if data.startswith(HEADER):
        # File already patched.
        return False

    with open(filename, 'w') as result:
        result.write(HEADER)
        result.write(data)
        result.write(FOOTER)

    return True


def download(save_to, url):
    opts = [DOWNLOAD['tool'], DOWNLOAD['output'], save_to, url]
    proc = subprocess.Popen(opts)
    proc.communicate()


def main(path):
    found_jquery = False
    found_rwdimgmap = False
    matches = 0

    for name in os.listdir(path):
        if name == JQUERY:
            found_jquery = True
        elif name == IMGMAPS:
            found_rwdimgmap = True
        elif name.endswith('.html'):
            matches += 1
            if patch(path, name):
                print path, name

    if not matches:
        return

    if not found_rwdimgmap:
        download(os.path.join(path, IMGMAPS), DOWNLOAD['rwdimgmap'])
    if not found_jquery:
        download(os.path.join(path, JQUERY), DOWNLOAD['jquery'])


if __name__ == "__main__":
    main(sys.argv[1])
