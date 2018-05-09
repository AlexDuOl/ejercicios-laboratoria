window.onload = function() {
	const modal = document.getElementById('portfolioModal');
	showModal(modal);
	
	const closeButton = modal.getElementsByClassName('close')[0];
	closeButton.addEventListener('click', function(){
		hideModal(modal);
	});

	function showModal(modal) {
		modal.style.display = "block";
	}

	function hideModal(modal) {
		modal.style.display = "none";
	}
}