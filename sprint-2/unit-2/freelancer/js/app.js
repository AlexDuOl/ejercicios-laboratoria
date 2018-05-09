window.onload = function() {
	const modal = document.getElementById('portfolioModal');

	const closeButton = modal.getElementsByClassName('close')[0];
	closeButton.addEventListener('click', function(){
		hideModal(modal);
	});

	const images = document.getElementsByClassName('portafolio-image');
	for(i=0;i<images.length;i++){
		images[i].addEventListener('click', function() {
			showModal(modal, this);
		});
	}

	function showModal(modal, element) {
		modal.getElementsByClassName('caption')[0].textContent = element.alt;
		modal.getElementsByTagName('img')[0].src = element.src;
		modal.style.display = "block";
	}

	function hideModal(modal) {
		modal.style.display = "none";
	}
}