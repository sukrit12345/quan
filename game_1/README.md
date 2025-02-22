# Life Simulator Game

A web-based life simulation game built with Next.js where players can create characters and experience different life events.

## Technologies

- Next.js
- Tailwind CSS
- Framer Motion

## Project Structure

```
app/
├── components/         # UI components
├── create-character/   # Character creation page
├── end/               # Game end screen
├── game/              # Main game screen
├── lib/               # Game logic and data
├── globals.css        # Global styles
├── layout.js          # Root layout
└── page.js            # Home page

public/
├── audios/            # Game sound assets
└── images/            # Game image assets
```

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to start the game.

## Development Notes

- Character creation system with customizable features
- Life event simulation with multiple choices
- Status tracking system (health, happiness, money, etc.)
- Mobile-responsive design