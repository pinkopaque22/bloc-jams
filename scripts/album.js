var setSong = function(songNumber) {
	currentlyPlayingSongNumber = songNumber;
	currentSongFromAlbum = songNumber == null? null: currentAlbum.songs[songNumber - 1];
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
     });
	if (currentSoundFile) {
         currentSoundFile.stop();
     }
	
	setVolume(currentVolume);
};
var seek = function(time) {
	if (currentSoundFile) {
		currentSoundFile.setTime(time);
	}
}
var setVolume = function(volume) {
	if (currentSoundFile) {
		  currentSoundFile.setVolume(volume);
	}
};

var getSongNumberCell = function(number){

	return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
	var template =

	'<tr class="album-view-song-item">'
	+'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
	+'  <td class="song-item-title">' + songName + '</td>'
	+'  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
	+'</tr>';
	var $row = $(template);
	

	var clickHandler = function() {

		var songNumber = parseInt($(this).attr('data-song-number'));

		if (currentlyPlayingSongNumber !== null) {
			  currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
				currentlyPlayingCell.html(currentlyPlayingSongNumber);
		}
		if (currentlyPlayingSongNumber !== songNumber) {
			  setSong(songNumber);
			  currentSoundFile.play();
				$(this).html(pauseButtonTemplate);
				updatePlayerBarSong();
		} 
		else if (currentlyPlayingSongNumber === songNumber) {
			if (currentSoundFile.isPaused()) {
				$(this).html(pauseButtonTemplate);
				$('.main-controls .play-pause').html(playerBarPauseButton);
				currentSoundFile.play();
			} else {
				 $(this).html(playButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPlayButton);
         currentSoundFile.pause(); 
			}
					
		}
	};
	var onHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
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
		if (songNumber !== currentlyPlayingSongNumber) {
				songNumberCell.html(songNumber);
		}

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
var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         currentSoundFile.bind('timeupdate', function(event) {
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
			  setCurrentTimeInPlayerBar(currentSoundFile.getTime());
     }
 };

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
	  var offsetXPercent = seekBarFillRatio * 100;
	  offsetXPercent = Math.max(0, offsetXPercent);
	  offsetXPercent = Math.min(100, offsetXPercent);
	
	  var percentageString = offsetXPercent + '%';
	  $seekBar.find('.fill').width(percentageString);
	  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         var seekBarFillRatio = offsetX / barWidth;
			 	 if($(this).parent().attr('class') == 'seek-control') {
					 seek(seekBarFillRatio * currentSoundFile.getDuration());
				 } else {
					   setVolume(seekBarFillRatio * 100)
				 }
         updateSeekPercentage($(this), seekBarFillRatio);
     });
};
		$seekBars.find('.thumb').mousedown(function(event) {
				 var $seekBar = $(this).parent();
		$(document).bind('mousemove.thumb', function(event){
				 var offsetX = event.pageX - $seekBar.offset().left;
				 var barWidth = $seekBar.width();
				 var seekBarFillRatio = offsetX / barWidth;
			   if($seekBar.parent().attr('class') == 'seek-control') {
					 seek(seekBarFillRatio * currentSoundFile.getDuration());
				 } else {
					 setVolume(seekBarFillRatio);
				 }
				 updateSeekPercentage($seekBar, seekBarFillRatio);
		});

	  $(document).bind('mouseup.thumb', function() {
			 $(document).unbind('mousemove.thumb');
			 $(document).unbind('mouseup.thumb');
		});
	});
 };


var trackIndex = function(album, song) {
	  return album.songs.indexOf(song);
};

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
	
	  setSong(currentSongIndex + 1);
		updateSeekBarWhileSongPlays();
	  updatePlayerBarSong();

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
	  if (direction == "next") {
			var $nextSongNumberCell = getSongNumberCell(setSong);
				 $nextSongNumberCell.html(pauseButtonTemplate);
		};
		if (direction == "previous") {
			var $previousSongNumberCell = getSongNumberCell(setSong);
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

var filterTimeCode = function(timeInSeconds) {
	var time = parseFloat(timeInSeconds) || 0;
	var minutes = Math.floor(time / 60) || 0;
	var seconds = ("0" + Math.floor(time % 60)).slice(-2);
	return minutes + ":"  + seconds;
};
var setTotalTimeInPlayerBar = function(totalTime) {
	$('.total-time').text(filterTimeCode(totalTime));
};
var setCurrentTimeInPlayerBar = function(currentTime){
	$('.current-time').text(filterTimeCode(currentTime));
		};
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
	  $('.main-controls .play-pause').html(playerBarPauseButton);
		setTotalTimeInPlayerBar(currentAlbum.duration);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-heart"></span></a>'
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-heart"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 5;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');




$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
		setupSeekBars();
	  $previousButton.click(goToSong("previous"));
    $nextButton.click(goToSong("next"));
	  
});

																		 
	

	
	
	
	
	
	
	
	
	
	

