# import music, infomations and the path into the database
import sqlite3, eyed3
conn=sqlite3.connect('../db.sqlite3')
c = conn.cursor()

c.execute('select * from player_album')
print(c.fetchall())

#C:\Users\Richii\Music
