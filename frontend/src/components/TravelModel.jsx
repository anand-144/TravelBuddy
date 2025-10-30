import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBX, useTexture, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const model = useFBX("/models/Earth.fbx");
  const [diffuse] = useTexture(["/models/textures/earth.jpg"]);

  useEffect(() => {
    diffuse.encoding = THREE.sRGBEncoding;
    diffuse.anisotropy = 16;

    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: diffuse,
          roughness: 0.9,
          metalness: 0.05,
          emissive: new THREE.Color(0x000000),
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model, diffuse]);

  useFrame(() => {
    model.rotation.y += 0.0015;
  });

  return <primitive object={model} scale={0.02} position={[0, 0, 0]} />;
};

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 640) {
      camera.position.set(2.5, 1.8, 3.5);
    } else if (size.width < 1024) {
      camera.position.set(3, 2, 4);
    } else {
      camera.position.set(3.5, 2.3, 5);
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
};

const TravelModel = () => {
  const canvasRef = useRef();

  return (
    <div className="fixed inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas
        shadows
        style={{ background: "transparent" }}
        ref={canvasRef}
        camera={{ position: [3.5, 2.3, 5], fov: 45 }}
      >
        <ResponsiveCamera />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={0.8}
          color="#c8d4ff"
          castShadow
        />
        <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#223366" />
        <Environment preset="night" />
        <Model />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
};

export default TravelModel;
