# import music, infomations and the path into the database
import sqlite3, eyed3, os, datetime
eyed3.log.setLevel("ERROR")

#path = 'C:/Users/Richii/Music'
path = '/home/user/music'

conn=sqlite3.connect('../db.sqlite3')
c = conn.cursor()

def scan_for_music(p):
	if os.path.isdir(path):
		for file in os.listdir(p):
			file_path = os.path.join(p, file)
			file_change_date = datetime.date.fromtimestamp(os.path.getmtime(file_path)).strftime('%Y-%m-%d')
			if file.endswith(".mp3") or file.endswith(".wma"):
				af = eyed3.load(file_path)
				#print(file_change_date)
				#Has the file an album Tag? No? Then the album is 'unbekannt'

				if af.tag.album == None:
					af.tag.album = 'Unbekannt'
				if af.tag.artist == None:
					af.tag.artist = 'Unbekannt'
				#print('Album: ' + af.tag.album)
				#print('Artist: ' + af.tag.artist)
				#print('Date: ' + str(af.tag.getBestDate()))

				#Exist Song? No? Then insert song.
				c.execute('select change_date from player_song where name =?', (file,))
				db_change_date = c.fetchone()
				if db_change_date == None:
					#Is there an album for this song? No? than insert album
					c.execute('select name from player_album where name=?', (af.tag.album,))
					if c.fetchone() == None:
						file_album_date = str(af.tag.getBestDate())
						#print(file_album_date)
						c.execute("insert into player_album(name, author, release_date) values(?,?,?)", (af.tag.album, af.tag.artist, file_album_date,))
						conn.commit()

						c.execute("select * from player_album")
						print('AlbumDatenbank')
						print(c.fetchone())

					c.execute('select id from player_album where name=?', (af.tag.album,))
					db_album_id = c.fetchone()
					c.execute("insert into player_song(name, audio_file, change_date, album_id) values(?,?,?,?)", (file, file_path, file_change_date, db_album_id[0],))
					conn.commit()
					print('insert song ' + file + ' successful')
				#if song exists, check change_date
				else:
					#if different then update song

					if db_change_date[0] != file_change_date:
						c.execute('select id from player_album where name=?', (af.tag.album,))
						db_album_id = c.fetchone()
						c.execute('update player_song set name=?, audio_file=?, change_date=?, album_id=? where name= ?', (file, file_path, file_change_date, db_album_id[0],file,))
						#conn.commit()
						print('updated Song ' + file + 'successful')
					else:
						print('Song ' + file + 'already exists')
				#look change from folder and compare it with first song from folder in db
				for sub_folder in os.listdir(p):
					sub_path = os.path.join(p, sub_folder)
					if os.path.isdir(sub_path):
						sub_folder_change_date = datetime.datetime.fromtimestamp(os.path.getmtime(sub_path)).strftime('%Y-%m-%d')
						#get first file change date
						for file in os.listdir(sub_path):
							if file.endswith(".mp3"):
								sub_file_path = os.path.join(sub_path, file)
								sub_file_name = file
							break

						c.execute('select change_date from player_song where name =?', (sub_file_name,))#get change date from first song
						sub_db_change_date = c.fetchone()
						if sub_folder_change_date != sub_db_change_date:
							scan_for_music(sub_path)
	else:
		print('wrong path')

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
