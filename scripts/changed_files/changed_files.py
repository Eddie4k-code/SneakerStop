

"""
Identifies files that were changed to produce a matrix to run in git hub actions for updating the appropriate docker images.
"""

import sys

files = sys.argv[1:]

services = set(["auth-service", "sneaker-service", "order-service", "payment-service"])

"""
Generates a matrix of service names returning an array of strings
"""
def get_changed_files(files):
    
    matrix = []
    
    for service in files:
        service_directory = service.split("/")[0]
        
        if service_directory in services:
            matrix.append(service_directory)
    

    return set(matrix)

print(get_changed_files(files))