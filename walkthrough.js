// Load the external player only after an explicit user click; link is the no-JS fallback.
const walkthroughPlay = document.getElementById("walkthrough-play");
walkthroughPlay?.addEventListener("click", (event) => {
  event.preventDefault();
  const frame = document.createElement("iframe");
  frame.src = "https://www.youtube-nocookie.com/embed/r0q8nUioCsc?autoplay=1&playsinline=1&rel=0";
  frame.title = "PrimeFlow Home Services — flagship system walkthrough";
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  walkthroughPlay.replaceWith(frame);
  frame.focus();
});
