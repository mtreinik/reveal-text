# reveal-text

Make simple text animations

When the user presses spacebar, a new text line scroll in from the bottom part of the screen. Each line continues all
the way to the top and away from the screen.

## Usage

- Update your own text contents to `slides.js`
- Open `index.html` in browser
- Press `SPACE` to show next slide
- Press `p` to go to previous slide (not very polished)
- Press `ENTER` to pause/play animation (doesn't actually stop the timer, so not very useful).

## Making of

I needed simple animated text slides for a video, so I made this little browser app.

First I made an implementation where I moved `<div>`s with absolute positions, but there
was screen tearing kind of problems. Then I changed to using HTML5 canvas, and animation
is smooth.

Slides are eased in and out using a cubic function and adjustable speed factors.

Can you guess what the example contents of `slide.js` mean?