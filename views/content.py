from flask import Blueprint, render_template, redirect, url_for

content = Blueprint('content', __name__, template_folder='templates', static_folder='static')

# @content.route('/article/')
# def _article():
#     return render_template('article.html')

@content.route('/acercade/')
def _acercade():
    return render_template('acercade.html')

@content.route('/boletines/')
def _boletines():
    return render_template('boletines.html')

@content.route('/cmvirtual/')
def _cmvirtual():
    return render_template('cmvirtual.html')

@content.route('/cmvirtual/maa/')
def _cmvirtual_maa():
    return render_template('cmvirtual_maa.html')

@content.route('/cmvirtual/mae/')
def _cmvirtual_mae():
    return render_template('cmvirtual_mae.html')

@content.route('/cmvirtual/maprodem/')
def _cmvirtual_maprodem():
    return render_template('cmvirtual_maprodem.html')

@content.route('/cmvirtual/mssr/')
def _cmvirtual_mssr():
    return render_template('cmvirtual_mssr.html')

@content.route('/direcciones/')
def _direcciones():
    return render_template('direcciones.html')

@content.route('/direcciones/googlemaps/')
def _direcciones_gm():
    return render_template('direcciones_googlemaps.html')

@content.route('/noticias/')
def _noticias():
    return render_template('noticias.html')

@content.route('/politicaprivacidad/')
def _politicaprivacidad():
    return render_template('politicaprivacidad.html')

@content.route('/preguntasfrecuentes/')
def _preguntasfrecuentes():
    return render_template('preguntasfrecuentes.html')

@content.route('/servicios/')
def _servicios():
    return render_template('servicios.html')

@content.route('/servicios/mae/')
def _servicios_mae():
    return render_template('servicios_mae.html')

@content.route('/servicios/mssr/')
def _servicios_mssr():
    return render_template('servicios_mssr.html')

@content.route('/servicios/mvcm/')
def _servicios_mvcm():
    return redirect(url_for('._servicios_maprodem'))

@content.route('/servicios/maa/')
def _servicios_maa():
    return render_template('servicios_maa.html')

@content.route('/servicios/maprodem/')
def _servicios_maprodem():
    return render_template('servicios_maprodem.html')

@content.route('/servicios/mec/')
def _servicios_mec():
    return render_template('servicios_mec.html')

@content.route('/servicios/mai/')
def _servicios_mai():
    return render_template('servicios_mai.html')

@content.route('/terminosdelservicio/')
def _terminosdelservicio():
    return render_template('terminosdelservicio.html')