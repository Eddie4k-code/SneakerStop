"""
Identifies files that were changed to produce a matrix to run in git hub actions for updating the appropriate docker images.
"""

import sys

files = sys.argv[1:]

services = set("auth-service", "sneaker-service", "order-service", "payment-service")

def get_changed_files(files):
    
    matrix = []
    
    for service in services:
        service_directory = service.split("/")[0]
        
        if service_directory in services:
            matrix.append(service_directory)
    

    return matrix

#Testing
print(get_changed_files(files))