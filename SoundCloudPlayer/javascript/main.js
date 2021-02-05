/*search*/

var UI = {};

UI.Enterpress = function() {
	document.querySelector(".js-search").addEventListener('keypress', function( e ) {
		if ( e.which === 13 ) {
			var inputValue = e.target.value;
			SoundCloudAPI.getTrack(inputValue);

		}
	});
}

UI.SubmitClick = function() {
	document.querySelector(".js-submit").addEventListener('click', function( e ) {
		var inputValue = document.querySelector(".js-search").value;
		SoundCloudAPI.getTrack(inputValue);

	});
} 

UI.Enterpress();
UI.SubmitClick();

/* query soundcloud api*/

var SoundCloudAPI = {};

SoundCloudAPI.init = function() {
	SC.initialize({
		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});

} 	


SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {

	return SC.get('/tracks/', {
		q: inputValue
	}).then(function(tracks) {
		console.log(tracks);

	var searchResult = document.querySelector('.js-search-results');
			searchResult.innerHTML = "";

  		SoundCloudAPI.renderTrack(tracks, searchResult);
	});

}

SoundCloudAPI.renderTracks = function(tracks, searchResult) {

	tracks.forEach(function(tracks) {
		//console.log(track.title);
//card
			var card = document.createElement('div');
			card.classList.add('card');
			var searchResults = document.querySelector(".js-search-results");
			searchResults.appendChild(card);
		
SoundCloudAPI.renderTracks();

			


//image
		// var imageDiv = document.createElement('div');
		// imageDiv.classList.add('image');

		// var image_img = document.createElement('img');
		// image_img.classList.add('image_img');
		// image_img.src = "http://www.placekitten.com/290/290";
		// image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

		// imageDiv.appendChild(image_img);
			var imageDiv = document.createElement('div');
			imageDiv.classList.add('image');

			var image_img = document.createElement('img');
			image_img.classList.add('image_img');
			image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

			imageDiv.appendChild( image_img );

	//imageDiv.appendChild(image_img);

//content
		// var content = document.createElement('div');
		// content.classList.add('content');
		// var header =  document.createElement('div');
		// header.classList.add('header');
		// header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank"> ' + track.title + '</a>';
		var content = document.createElement('div');
			content.classList.add('content');

			var header = document.createElement('div');
			header.classList.add('header');
			header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

			content.appendChild( header );

			searchResult.appendChild(content);

//button
		var button = document.createElement('div');
		header.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');
		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to playlist';

	});



// append child

		// var card = document.createElement('div');
		// card.classList.add('card');

		// var searchResults = document.querySelector('.js-search-results');
		// searchResults.appendChild(card);

content.appendChild(header);

card.appendChild(imageDiv);
card.appendChild(content);
card.appendChild(button);
searchResult.appendChild( card );

button.appendChild(icon);
button.appendChild(buttonText);

button.addEventListener('click', function(){
	SoundCloudAPI.getEmbed(track.permalink_url);
});



var searchResults = document.querySelector('.js-search-results');
searchResults.appendChild(card);

}

SoundCloudAPI.getEmbed = function(trackURL) {
console.log("Click I'm in getEmbed");
SC.oEmbed(trackURL, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);

  var sideBar = document.querySelector('.js-playlist');
  sideBar.innerHTML = embed.html;

  var box = document.createElement('div');
  sideBar.innerHTML = embed.html;

  sideBar.insertBefore(box, sideBar.firstChild);
  localStorage.setItem("key", sideBar.innerHTML);

	});
}
var sideBar = document.querySelector(".js-playlist");
sideBar.innterHTML = localStorage.getItem("key");


//soundCloudAPI.renderTracks();


/* display the cards*/


/*add to playlist and play*/