const myFunction = () => {
    const winScroll = window.scrollY;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("bar").style.width = `${scrolled}%`;
  };
  
  window.onscroll = myFunction;
  