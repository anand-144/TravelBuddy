import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";

function AnimatedModel({ path }) {
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play first available animation
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.play();
    }
  }, [actions]);

  return <primitive object={scene} scale={1.5} />;
}

const ThreeDModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <Suspense fallback={<Html center>Loading 3D Model...</Html>}>
          <AnimatedModel path="/models/earth-cartoon.glb" />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
