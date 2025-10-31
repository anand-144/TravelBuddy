import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF, useAnimations } from "@react-three/drei";

function AnimatedTraveler({ path }) {
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={1.6}             // ✅ balanced for login screen
      position={[0, -2.8, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

const Travel3DModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <Suspense fallback={<Html center>🧳 Loading traveler...</Html>}>
          <AnimatedTraveler path="/models/walking-man.glb" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
};

export default Travel3DModel;
