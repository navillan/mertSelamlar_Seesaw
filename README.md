# Seesaw

An interactive project where you balance a seesaw by dropping weighted balls.

## Features

- **Interactive Ball Dropping**: Hover over the ball frame to create a ball, then click to drop it onto the plank.
- **Dynamic Weight System**: Balls have random weights 1 to 10 with different colors.
- **Physics Simulation**: The plank tilts based on torque calculated from ball positions and weights.
- **Persistent State**: Seesaw state is saved in localStorage and restored on reload.
- **Visual Feedback**: Displays left/right weights, next ball weight, and current tilt angle.

## Files

- `index.html` - Main HTML structure
- `index.css` - Styling for the seesaw interface
- `index.js` - Seesaw logic and event handling
- `oneForAll.js` - Self-contained version that builds HTML/CSS dynamically

## How to Play

1. Hover your mouse over the play area to see a ball preview.
2. Click to drop the ball onto the plank.
3. Try to keep the plank balanced or watch it tilt based on weight distribution.
4. Click "Clear Board" to reset the seesaw.

## Thougth Process

1. First need was to create a frame that includes an info bar and a game frame
- Two sections were created, one for info and one for the seesaw.
2. Second need was to create a structure that has an area to place the plank system and ball rendering area
3. Third need was to find how to track the cursor position in the frame or if is cursor in the frame
- New frame added inside game frame with same width as the plank to track the cursor movement with the help of getBoundingClientRect() method and create the ball on cursor.
4. Fourth need was to appending the ball to the exact length from the center as the cursor's
- With the help of AI tools, right calculations make it possible to place the ball to the right distance
5. Fifth need was to calculating the right torque value and tilting the plank according to that value
- Another help from AI tools to find the correct equasions to calculate true values
6. Sixth need was to store the values at the local storage in order to hold the latest state of the seesaw
- Storing values at local and taking them at the start of the page load
7. Seventh need was to creating a bundle that includes all files so that it can work by itself

## Limitations

- Lack of mathematical background reduced my speed and create a neccessity to search for the right equations.
- Learning new features was great but using it at full capacity at the same time was not possible.
- Storing values at the local storage was easy, but storing every ball along with its position on the plank and reloading them each time was felt unneccesary so i didn't want to put any effort in that direction because it would only affect the system visualy. Since the correct values were already being stored, even if the balls were not visible, their weight was still accounted for.

## Trade-offs

- Because of my insufficient mathematical background, I had to rely on AI to find the correct equations.
- My only regret is that the balls falling animation was after appending it to the plank, so basically after the click event happens in the frame the ball has appended to the plank, even i knew this was not the ideal solution, it was the fastest solution at the time that i come up with. If i would build this project again, i would try to fix it most likely, and maybe starting the animation after the click event but append the ball to the plank only after the animation ends, so it would fall from the right position visualy.