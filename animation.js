document.querySelectorAll('.siteanother').forEach((element) => {
    element.addEventListener('mouseover', () => {
        element.classList.add('animate', 'cos');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('animate'); 
        element.classList.add('animateup'); 

        element.addEventListener('animationend', () => {
            element.classList.remove('cos', 'animateup');
        }, { once: true });
    });
});
