import os

from flask import Flask, render_template


app = Flask(__name__)
app.secret_key = "s3cr3t"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

#ruta del metodo get donde se relacion al index
@app.route("/", methods=["GET"])
def index():


    """
        creation of a game where the jump instruction is given using the spacer and passes obstacles
        Parameters
        ----------
        
        Get:
        unique_id
        get_file_content
        fig= figura
        axis: coord
        canvas: figura canvas

        Returns
        -------
        Returns the graph made by the user, later this graph is sent to the 
        results class to be saved in a list that is created in the aforementioned class. 
    """
    return render_template("/layouts/index.html")


# main de la clase para su ejecución
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
