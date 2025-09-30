from flask import Blueprint, render_template #always looks within the template folder (hence, having it is must)
from flask_login import login_required, current_user

views = Blueprint("views", __name__)

@views.route("/")
@views.route("/home")
@login_required
def home():
    return render_template("home.html", name=current_user.username)