#!/usr/bin/python
import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/ciudadmujer.gob.hn/cmh_pwa/")

from swing_main import app as application
# 
# Replace this secret key for enhanced security.
#
# You could use a random generated string like:
#   python -c 'import os; print(os.urandom(16))'
#
application.secret_key = '11810221'.encode('utf8')
