from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import time
from catalogo import Catalogo