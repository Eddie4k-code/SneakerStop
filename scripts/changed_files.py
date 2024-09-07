"""
Identifies files that were changed to produce a matrix to run in git hub actions for updating the appropriate docker images.
"""

import sys

files = sys.argv[1:]

def get_changed_files(files):
    return files

#Testing
print(get_changed_files(files))