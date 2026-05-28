# 🐠 Aquarium Game

A beautiful interactive aquarium simulation built with modern web technologies.

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **PixiJS** - High-performance 2D WebGL rendering

## 🎮 Features

- **Dynamic Fish Simulation** - Fish swim naturally with realistic movement patterns
- **Interactive Controls** - Add, remove, pause/play fish
- **Responsive Design** - Adapts to different screen sizes
- **Smooth Animations** - Powered by PixiJS for 60fps rendering
- **Beautiful UI** - Modern gradient design with glassmorphism

## 📦 Installation

Dependencies are already installed! If you need to reinstall:

```bash
npm install
```

## 🏃 Running the Game

### Development Mode

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🎯 How to Play

1. Click **"Add Fish"** to spawn new fish in the aquarium
2. Click **"Pause/Play"** to control the simulation
3. Click **"Remove Fish"** to remove the last fish added
4. Watch as fish swim around with realistic behavior!

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── AquariumCanvas.tsx    # PixiJS rendering component
│   └── GameControls.tsx      # Control buttons UI
├── stores/
│   └── gameStore.ts      # Zustand state management
└── types/
    └── game.ts           # TypeScript type definitions
```

## 🔧 Customization

### Adding New Fish Colors

Edit `src/stores/gameStore.ts`:

```typescript
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
];
// Add more hex colors here!
```

### Adjusting Fish Speed

Modify the speed range in `createRandomFish()`:

```typescript
speed: 1 + Math.random() * 2,  // Min: 1, Max: 3
```

### Changing Aquarium Background

Edit `AquariumCanvas.tsx`:

```typescript
backgroundColor: 0x1e3a5f,  // Change this hex color
```

## 🐛 Troubleshooting

If you encounter any issues:

1. Clear `.next` folder: `rm -rf .next` (or delete manually)
2. Reinstall dependencies: `npm ci`
3. Restart dev server: `npm run dev`

## 📝 Future Enhancements

- [ ] Different fish species with unique behaviors
- [ ] Food feeding system
- [ ] Day/night cycle
- [ ] Decorations and obstacles
- [ ] Sound effects
- [ ] Save/load aquarium state
- [ ] Fish collision detection
- [ ] Bubbles animation

## 📄 License

This project is open source and available for personal and educational use.

---

Built with ❤️ using the latest web technologies
