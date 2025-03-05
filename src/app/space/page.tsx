'use client';

import SpaceSimulation from '@/components/SpaceSimulation';

export default function SpacePage() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <SpaceSimulation />
    </div>
  );
} 