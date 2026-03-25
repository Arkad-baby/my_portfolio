"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Model } from "../Components/Fan_art_aot";
import { Phoenix } from "../Components/Phoenix";
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';

export default function Page() {
  return (
    // 1. The main container defines the scroll height (3 pages = 300vh)
    <main style={{ background: "#050505", height: "300vh", position: "relative" }}>
      
      {/* 2. THE 3D SCENE (FIXED AND ON TOP) */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 10,        // High Z-Index to catch mouse movements
        pointerEvents: 'none' // We apply this to the DIV, but we will enable it for the Canvas
      }}>
        <Canvas 
          camera={{ position: [0, 2, 10], fov: 35 }}
          style={{ pointerEvents: 'auto' }} // This allows the Phoenix to see your mouse!
        >
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          <Model position={[0, -1, 0]} />
          <Phoenix scale={0.0008} />
          
          <OrbitControls enableZoom={false} enablePan={false} makeDefault />
          <Environment preset="sunset" />

          <EffectComposer>
            <Bloom luminanceThreshold={1.2} intensity={0.3} levels={9} mipmapBlur />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 3. THE HTML CONTENT (BEHIND THE CANVAS) */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
          <h1 style={{ color: 'white', fontSize: '5rem', fontWeight: 'bold' }}>KRITAN<br/>MAHARJAN</h1>
        </section>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Selected Projects</h1>
        </section>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Get in Touch</h1>
        </section>
      </div>
    </main>
  );
}