const navbarbutton = document.getElementsByClassName("siteanother");

navbarbutton.array.forEach(button => {
    button.addEventListener('mouseover', () => {
		button.classList.add('animate');
	});
	button.addEventListener('animationend', () => {
		button.classList.remove('animate');
	});
});