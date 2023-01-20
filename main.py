from flask import Flask, render_template ,request,redirect,session
import os
import pymysql

app = Flask(__name__,template_folder="templates")
app.secret_key=os.urandom(24)

conn=pymysql.connect(host="localhost",user="root",password="",database="")
Cursor=conn.cursor()

