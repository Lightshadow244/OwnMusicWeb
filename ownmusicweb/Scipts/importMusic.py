# import music, infomations and the path into the database
import sqlite3
conn=sqlite3.connect('../db.sqlite3')
c = conn.cursor()

c.execute('select * from album')
print(c.fetchone())
