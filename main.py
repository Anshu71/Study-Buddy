from flask import Flask, render_template ,request,redirect,session
import os
import pymysql

app = Flask(__name__,template_folder="templates")
app.secret_key=os.urandom(24)

conn=pymysql.connect(host="localhost",user="root",password="",database="login")
Cursor=conn.cursor()

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login.html')
def Login():
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_Id')
    return redirect('/')

@app.route('/feedback.html')
def contact():
    return render_template('feedback.html')

@app.route('/welcome.html')
def home():
    if 'user_Id' or 'email' in session:
        user_Id = session['user_Id']  
        email = session['email']
        # name = session['name']
        return render_template('welcome.html', email=email)
    elif 'user_Id' not in session:
        return redirect('/login.html')
    else:
        user_Id = None
        return render_template('welcome.html', user_Id=user_Id)

@app.route('/courses.html')
def courses():
    if 'user_Id' in session:
        if 'user_Id' or 'email' in session:
            user_Id = session['user_Id']  
            email = session['email']
            # name = session['name']
            return render_template('courses.html', email=email)
        elif 'user_Id' not in session:
            return redirect('/login.html')
        else:
            user_Id = None
            return render_template('courses.html', user_Id=user_Id) 
    else:
        return render_template('login.html')



@app.route('/login_validation', methods=['POST'])
def login_validation():
    email=request.form.get('email')
    password=request.form.get('password')

    Cursor.execute(""" SELECT * FROM `pal` WHERE `email` LIKE '{}' AND `password` LIKE '{}'  """.format(email,password))
    pal = Cursor.fetchall()
    if len(pal)>0:
        session['user_Id']=pal[0][0] 
        session['email']=pal[0][1]       #to print the name of the perticular logged in user
        return redirect('/welcome.html')
    else:
        return render_template('/login.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    name=request.form.get('name')
    email=request.form.get('email')
    password=request.form.get('password')

    Cursor.execute(""" INSERT INTO `pal` (`user_Id`,`name`,`email`,`password`) VALUES (NULL,'{}','{}','{}')  """.format(name,email,password))
    conn.commit()

    Cursor.execute(""" SELECT * FROM `pal` WHERE `email` LIKE '{}' """.format(email))
    myuser = Cursor.fetchall()
    session['user_Id'] = myuser[0][0]
    return redirect("/login.html")


@app.route('/contact_us', methods=['POST'])
def contact_us():
    name=request.form.get('name')
    email=request.form.get('email')
    message=request.form.get('message')

    Cursor.execute(""" INSERT INTO `contact_us` (`user_Id`,`name`,`email`,`message`) VALUES (NULL,'{}','{}','{}')  """.format(name,email,message))
    conn.commit()

    return redirect("/contact.html")


app.run(debug=True)