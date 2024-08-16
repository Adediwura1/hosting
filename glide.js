  const firstSlide=document.querySelector('#glide1');
  if (firstSlide){
    new Glide(firstSlide, {
      type: 'carousel',
      startAt: 0,
      autoplay: 4000,
      gap: 0,
      hoverpause: true,
      perview: 1,
      animationDuration: 800,
      AnimationTimingFunc: 'linear',
      loop: true,
    }).mount();
  }