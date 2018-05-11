
var portafolio = document.getElementById('portafolio');
var images = portafolio.getElementsByClassName('portafolio-image');

Array.from(images).map(function(image){
	image.addEventListener('click', function() {
		var portfolioModal = document.getElementById('portfolioModal');
		portfolioModal.getElementsByTagName('img')[0].src = this.src;
		portfolioModal.getElementsByClassName('caption')[0].textContent = this.alt;;
		showModal('portfolioModal');

		portfolioModal.getElementsByClassName('closeButton')[0]
		.addEventListener('click', function(){
			hideModal('portfolioModal');
		});
	})
});

function showModal(id) {
	var modal = document.getElementById(id);
	modal.style.display = "block";
}

function hideModal(id) {
	var modal = document.getElementById(id);
	modal.style.display = "none";
}