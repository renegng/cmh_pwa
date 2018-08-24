from flask import Blueprint, render_template

content = Blueprint('content', __name__, template_folder='templates', static_folder='static')

@content.route('/article')
def _article():
    return render_template('article.html')

@content.route('/servicios')
def _servicios():
    return render_template('servicios.html')

@content.route('/servicios/mae')
def _servicios_mae():
    return render_template('servicios_mae.html')

@content.route('/servicios/mssr')
def _servicios_mssr():
    return render_template('servicios_mssr.html')

@content.route('/servicios/mvcm')
def _servicios_mvcm():
    return render_template('servicios_mvcm.html')

@content.route('/servicios/maa')
def _servicios_maa():
    return render_template('servicios_maa.html')

@content.route('/servicios/mec')
def _servicios_mec():
    return render_template('servicios_mec.html')

@content.route('/servicios/mai')
def _servicios_mai():
    return render_template('servicios_mai.html')