window.onload = function() {
	
	const images = document.getElementsByClassName('portafolio-image');
	for(i=0;i<images.length;i++){
		images[i].addEventListener('click', function() {
			showModal('portfolioModal', this);
		});
	}
}

function showModal(modalId, element) {
	const modal = document.getElementById(modalId);

	const closeButton = modal.getElementsByClassName('close')[0];
	closeButton.addEventListener('click', function(){
		hideModal(modalId);
	});

	modal.getElementsByClassName('caption')[0].textContent = element.alt;
	modal.getElementsByTagName('img')[0].src = element.src;
	modal.style.display = "block";
}

function hideModal(modalId) {
	const modal = document.getElementById(modalId);
	modal.style.display = "none";
}