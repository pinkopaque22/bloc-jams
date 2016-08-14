var albumTwilightSingers = {
	title: 'Powder Burns',
	artist: 'The Twilight Singers',
	label: 'One Little Indian Records',
	year: '2006',
	albumArtUrl: 'assets/images/album_covers/dulli.jpeg',
	songs: [
		{title: 'Toward The Waves', duration: '0:29' },
		{title: 'I\n m Ready', duration: '3:05' },
		{title: 'There\n s Been an Accident', duration: '5:17' },
		{title: 'Bonnie Brae', duration: '4:46' },
		{title: 'Forty Dollars', duration: '3:51' },
		{title: 'Candy Cane Crawl', duration: '4:27' },
		{title: 'Underneath the Waves', duration: '4:29' },
		{title: 'My Time (Has Come)', duration: '4:23' },
		{title: 'Dead to Rights', duration: '4:25' },
		{title: 'The Conversation', duration: '3:05' },
		{title: 'Powder Burns', duration: '5:53' },
		{title: 'I Wish I Was', duration: '4:21' }
	]
};

var albumPicasso = {
	title: 'The Colours',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{title: 'Blue', duration: '4:26' },
		{title: 'Green', duration: '3:14' },
		{title: 'Red', duration: '5:01' },
		{title: 'Pink', duration: '3:21' },
		{title: 'Magenta', duration: '2:15' }
	]
};

var albumMarconi = {
	title: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{title: 'Hello Operator?', duration: '1:01' },
		{title: 'Ring, ring, ring', duration: '5:01' },
		{title: 'Fits in your pocket', duration: '3:21' },
		{title: 'Can you hear me now?', duration: '3:14' },
		{title: 'Wrong phone number', duration: '2:15' }
	]
};
var createSongRow = function(songNumber, songName, songLength) {
	var template =
			'<tr class="album-view-song-item">'
	+' <td class="song-item-number">' + songNumber + '</td>'
	+' <td class="song-item-title">' + songName + '</td>'
	+' <td class="song-item-duration">' + songLength + '</td>'
	+'</tr>'
	;
	
	return template;
};
var albumTitle = document.getElementsByClassName('album-view-title') [0];
var albumArtist = document.getElementsByClassName('album-view-artist') [0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info') [0];
var albumImage = document.getElementsByClassName('album-cover-art') [0];
var albumSongList = document.getElementsByClassName('album-view-song-list') [0];

var setCurrentAlbum = function(album) {
	
	
	
	albumTitle.firstChild.nodeValue = album.title;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);
	
	albumSongList.innerHTML = '';
	
	for (var i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
	}
};

window.onload = function() {
	setCurrentAlbum(albumPicasso);
	
	var albums = [albumTwilightSingers, albumPicasso, albumMarconi ];
	var index = 0;
	albumImage.addEventListener("click", function(event) {
		setCurrentAlbum(albums[index]);
		index++;
		if (index == albums.length) {
			index = 0;
		}
		
															
	});
};
