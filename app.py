from flask import Flask , render_template , redirect , request ,  url_for
from cs50 import SQL

app = Flask(__name__)
db = SQL("sqlite:///books.db")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/genre/<genre>')
def romance(genre):
    genre = genre.replace("_", " ")
    genre = genre.title()
    queryr = "SELECT * FROM books WHERE category = ?"
    rows = db.execute(queryr, (genre,))
    return render_template('category.html', rows=rows, title=genre)

@app.route('/addbook' , methods=['POST' , 'GET'] )
def addbook():
    if request.method == 'GET':
        return render_template('addbook.html')
    else:
        name = request.form.get('title')
        author = request.form.get('author')
        category = request.form.get('Category')
        link = request.form.get('link')
        query = f"""INSERT INTO books VALUES('{name}' , '{author}' , '{category}' , "{link}")"""
        db.execute(query)
        return redirect('/')


@app.route("/search" , methods=['POST' , 'GET'])
def search():
    query = request.args.get("q")
    query = f"%{query}%"
    q = "SELECT * FROM books WHERE name LIKE ?"
    rows = db.execute(q, (query,))
    return render_template("category.html", rows=rows, title="Search")


if __name__ == '__main__':
    app.run(debug= True)