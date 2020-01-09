function draggable(dragBox) {
  console.log(dragBox);
  const slider = document.querySelector(dragBox);
	let isDown = false;
	let startx, scrollLeft;

	slider.addEventListener("mousedown", (e) => {
		e.preventDefault();
		isDown = true;
		startx = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});

	slider.addEventListener("mouseleave", () => {
		isDown = false;
	});

	slider.addEventListener("mouseup", () => {
		isDown = false;
	});

	slider.addEventListener("mousemove", (e) => {
		if(!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startx) * 2;
		slider.scrollLeft = scrollLeft - walk;
	});
}

export default draggable