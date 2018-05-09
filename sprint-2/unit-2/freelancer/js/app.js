window.onload = function() {
	
	let images = document.getElementsByClassName('portafolio-image');
	for(i=0;i<images.length;i++){
		images[i].addEventListener('click',showModal);
	}

	function showModal() {
		let modal = document.getElementById('portafolioModal');
		let imgModal = modal.getElementsByTagName('img')[0];
		let captionModal = modal.getElementsByClassName('caption')[0];
		let closeModal = modal.getElementsByClassName('close')[0];
		
		imgModal.src = this.src;
		captionModal.textContent = this.alt;
		closeModal.addEventListener('click', hideModal);
		modal.style.display = "block";
	}

	function hideModal() {
		let modal = document.getElementById('portafolioModal');
		modal.style.display = "none";
	}
}