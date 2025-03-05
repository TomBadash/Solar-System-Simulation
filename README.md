# Interactive Solar System Simulation

An interactive 3D visualization of our solar system built with Next.js, React Three Fiber, and TypeScript. This project provides an educational and engaging way to explore the planets in our solar system.
![image](https://github.com/user-attachments/assets/d7927a7b-55cb-434a-9dd2-4f95aad389ee)

## Features

- **Interactive 3D Solar System**
  - Realistic planet orbits and rotations
  - Scale-based representation of planets
  - Interactive camera controls for exploration
  - Hover effects and click interactions

- **Planet Information**
  - Detailed information for each planet
  - Distance from sun
  - Orbital speed
  - Unique characteristics
  - Interactive labels

- **Controls**
  - Auto-rotation toggle
  - Pause/Resume planet movements
  - Zoom and pan capabilities
  - Full-screen immersive experience

## Technologies Used

- Next.js 14 (App Router)
- React 18
- Three.js
- React Three Fiber
- React Three Drei
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the simulation.

## Usage

- **Camera Controls**:
  - Rotate: Click and drag
  - Zoom: Mouse wheel
  - Pan: Right-click and drag

- **Planet Interaction**:
  - Hover over planets to highlight them
  - Click on planets to view detailed information
  - Use the control buttons to toggle auto-rotation and pause/resume planet movements

## Project Structure

```
src/
├── app/
│   └── components/
│       └── SpaceSimulation.tsx  # Main simulation component
├── lib/
│   └── types/                   # TypeScript type definitions
└── styles/
    └── globals.css             # Global styles
```

## Features in Detail

### Planets
- Mercury: Closest to the sun with dramatic temperature variations
- Venus: Earth's sister planet with extreme greenhouse effect
- Earth: Our home planet with one natural satellite
- Mars: The Red Planet with the largest volcano
- Jupiter: Largest planet with the Great Red Spot
- Saturn: Known for its beautiful rings
- Uranus: Ice giant with unique rotation
- Neptune: The windiest planet

### Visual Effects
- Realistic star background
- Orbit path visualization
- Dynamic lighting from the sun
- Smooth animations and transitions
- Responsive design for all screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Planet data and characteristics from NASA
- Three.js community for 3D rendering support
- Next.js team for the amazing framework
