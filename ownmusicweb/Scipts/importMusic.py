# import music, infomations and the path into the database
import sqlite3, eyed3, os
eyed3.log.setLevel("ERROR")

path = 'C:/Users/Richii/Music'

conn=sqlite3.connect('../db.sqlite3')
c = conn.cursor()

def scan_for_music(p):
    for file in os.listdir(p):
        file_path = os.path.join(p, file)
        if file.endswith(".mp3") or file.endswith(".wma"):
            af = eyed3.load(file_path)

            #Has the file an album Tag? No? Then the album is 'unbekannt'
            if af.tag.album == None:
                af.tag.album = 'Unbekannt'
            if af.tag.artist == None:
                af.tag.artist = 'Unbekannt'

            #Exist Song? No? Then insert song.
            c.execute('select change_date from player_song where name =?', (file,))
            change_date_current_song = c.fetchone()
            if change_date_db == None:
                #Is there an album for this song? No? than insert album
                c.execute('select name from player_album where name=?', (af.tag.album,))
                if c.fetchone() == None:
                    #print(af.tag.getBestDate())
                    c.execute("insert into player_album(name, author, release_date) values(?,?,?)", (af.tag.album, af.tag.artist, af.tag.release_date,))
                c.execute('select id from player_album where name=?', (af.tag.album,))
                album_id = c.fetchone()
                c.execute('insert into player_song(name, audio_file, change_date, album_id) values(?,?,?,?)', (file, file_path, os.path.getmtime(file_path), album_id,))
                print(file + ' created')
            #if song exists, check change_date
            else:
                #if different then update song
                if change_date_db != :
                    c.execute('update into play_song (name, audio_file, change_date, album_id) values(?,?,?,?) where name= ?', (file, file_path, os.path.getmtime(file_path), album_id,file,))

            #look change from folder and compare it with first song from folder in db
            for folder in os.listdir(p):
                c.execute('')#get change date from first song)
                x= c.fetchone()
                if os.listdir(os.path.join(p, folder)). != x

scan_for_music(path)
conn.close()







#C:/Users/Richii/Music
#'F:/Musik'

#for root,subdirs, files in os.walk(p):
#    for file in files:
#        file_path = os.path.join(root, file)
#        if file.endswith(".mp3") or file.endswith(".wma") :
#        #print(os.path.join(path, file))
#            af = eyed3.load(file_path)
#            print(file_path + ' = ')
