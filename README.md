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
