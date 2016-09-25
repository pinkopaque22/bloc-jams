var setSong = function(songNumber) {
<<<<<<< HEAD
		currentlyPlayingSongNumber = parseInt(songNumber);
		currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
		currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
     });

	};var createSongRow = function(songNumber, songName, songLength) {
=======
	currentlyPlayingSongNumber = songNumber;
	currentSongFromAlbum = songNumber == null? null: currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){

	return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
	var template =

	'<tr class="album-view-song-item">'
	+'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
	+'  <td class="song-item-title">' + songName + '</td>'
	+'  <td class="song-item-duration">' + songLength + '</td>'
	+'</tr>';
<<<<<<< HEAD
	var $row = $(template);	
	var getSongNumberCell = function(number) {
		return $('.song-item-number[data-song-number="' + number + '"]');
	};
=======
	var $row = $(template);
	

>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
	var clickHandler = function() {

		var songNumber = parseInt($(this).attr('data-song-number'));

<<<<<<< HEAD
		if (setSong !== null) {
				var currentlyPlayingCell = getSongNumberCell(setSong);
				currentlyPlayingCell.html(setSong);
=======
		if (currentlyPlayingSongNumber !== null) {
				var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
				currentlyPlayingCell.html(currentlyPlayingSongNumber);
>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
		}
		if (setSong !== songNumber) {
			  setSong(songNumber);
			  currentSoundFile.play();
				$(this).html(pauseButtonTemplate);
<<<<<<< HEAD
				updatePlayerBarSong();
		} else if (setSong === songNumber) {
				if(currentSoundFile.isPaused()) {
					$(this).html(pauseButtonTemplate);	
				  $('.main-controls .play-pause').html(playerBarPauseButton);
					currentSoundFile.play();
				} else {
					$(this).html(playButtonTemplate);
				  $('.main-controls .play-pause').html(playerBarPlayButton);
					currentSoundFile.pause();
				}
=======
				setSong(songNumber);
				updatePlayerBarSong();
		} 
		else if (currentlyPlayingSongNumber === songNumber) {
				$(this).html(playButtonTemplate);	
				$('.main-controls .play-pause').html(playerBarPlayButton);
				setSong(null);
>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
		}
	};
	var onHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== setSong) {
				songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));
	//
	//	 if (songNumber !== currentlyPlayingSong) {
	//			songNumberCell.html(playButtonTemplate);
	//	 }
		if (songNumber !== setSong) {
				songNumberCell.html(songNumber);
		}
<<<<<<< HEAD
=======

>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
	};
	
	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);	

	return $row;
};

	

     
var setCurrentAlbum = function(album) {
	currentAlbum = album;
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');


	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);

	$albumSongList.empty();

	for (var i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
	}
};
var trackIndex = function(album, song) {
	  return album.songs.indexOf(song);
};

<<<<<<< HEAD
var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    setSong(songNumber);
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + setSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(songNumber);
=======
//var nextSong = function() {
//    
//    var getLastSongNumber = function(index) {
//        return index == 0 ? currentAlbum.songs.length : index;
//    };
//    
//    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//    currentSongIndex++;
//    
//    if (currentSongIndex >= currentAlbum.songs.length) {
//        currentSongIndex = 0;
//    }
//// && 138 can both live in new fx. 
//    
//    currentlyPlayingSongNumber = currentSongIndex + 1;
//    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
//
//    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
//    $('.currently-playing .artist-name').text(currentAlbum.artist);
//    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
//    $('.main-controls .play-pause').html(playerBarPauseButton);
//    
//    var lastSongNumber = getLastSongNumber(currentSongIndex);
//    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
//    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
//    
//    $nextSongNumberCell.html(pauseButtonTemplate);
//    $lastSongNumberCell.html(lastSongNumber);
//    
//};
//make these two fx one big function. 1.) ID in next/previous code that will remain the same, and code that has to change depending upon next or previous
//142- 153 is all the same and can be directly copied into function. Everything else refactor
var goToSong = function(direction) {
//w/prev song return index song lenght -1 , if next song is 0 do something else
	  var getLastSongNumber = function(index) {
			if (direction == "next") {
				return index == 0 ? currentAlbum.songs.length : index;
			}
      if(direction == "previous") {
				 return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
			}
		};
		var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
		currentSongIndex = direction == "next" ? currentSongIndex++ : currentSongIndex--;	
	
		if (currentSongIndex < 0) {
				currentSongIndex = currentAlbum.songs.length - 1;
		}
		if (currentSongIndex >= currentAlbum.songs.length) {
				currentSongIndex = 0;
		}
	
	  currentlyPlayingSongNumber = currentSongIndex + 1;
>>>>>>> a379901cce15b37d0237054e74dc91e0745e66e8
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
	  if (direction == "next") {
			var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
				 $nextSongNumberCell.html(pauseButtonTemplate);
		};
		if (direction == "previous") {
			var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
			 $previousSongNumberCell.html(pauseButtonTemplate);
		};
    $lastSongNumberCell.html(lastSongNumber);
};
//var previousSong = function() {
//    
//    var getLastSongNumber = function(index) {
//        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
//    };
//    
//    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//    currentSongIndex--;
//    
//    if (currentSongIndex < 0) {
//        currentSongIndex = currentAlbum.songs.length - 1;
//    }
//    
//    currentlyPlayingSongNumber = currentSongIndex + 1;
//    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
//
//    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
//    $('.currently-playing .artist-name').text(currentAlbum.artist);
//    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
//    $('.main-controls .play-pause').html(playerBarPauseButton);
//    
//    var lastSongNumber = getLastSongNumber(currentSongIndex);
//    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
//    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
//    
//    $previousSongNumberCell.html(pauseButtonTemplate);
//    $lastSongNumberCell.html(lastSongNumber);
//    
//};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

	  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-heart"></span></a>'
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-heart"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');




$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
	  $previousButton.click(goToSong("previous"));
    $nextButton.click(goToSong("next"));
});

																		 
	

	
	
	
	
	
	
	
	
	
	

