"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ClinicalScannerRig() {
  const helixGroup = useRef<THREE.Group>(null!);
  const scannerBeam = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  const nodeCount = 26;
  const radius = 1.05;
  const height = 4.0;

  const data = useMemo(() => {
    const list = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 4;
      const y = (i / nodeCount) * height - height / 2;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      list.push({ x1, y, z1, x2, z2, key: i });
    }
    return list;
  }, [nodeCount, radius, height]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth continuous rotation
    if (helixGroup.current) {
      helixGroup.current.rotation.y = t * 0.35;
    }

    // Sweeping laser scanner up & down
    if (scannerBeam.current) {
      scannerBeam.current.position.y = Math.sin(t * 1.5) * 1.8;
    }

    // Gyro tracking rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.4;
      ringRef1.current.rotation.y = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.3;
      ringRef2.current.rotation.x = -t * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group scale={1.12}>
        {/* Sweeping Laser Scanner Disc */}
        <mesh ref={scannerBeam} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 1.8, 48]} />
          <meshBasicMaterial
            color="#E5C287"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gyroscopic Telemetry Rings */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[1.9, 0.008, 16, 80]} />
          <meshStandardMaterial color="#C5A880" opacity={0.4} transparent />
        </mesh>
        <mesh ref={ringRef2}>
          <torusGeometry args={[1.75, 0.006, 16, 80]} />
          <meshStandardMaterial color="#8A7352" opacity={0.3} transparent />
        </mesh>

        {/* DNA Helix Strand */}
        <group ref={helixGroup}>
          {data.map((node, i) => {
            const p1 = new THREE.Vector3(node.x1, node.y, node.z1);
            const p2 = new THREE.Vector3(node.x2, node.y, node.z2);
            const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
            const len = p1.distanceTo(p2);

            const matrix = new THREE.Matrix4();
            matrix.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

            return (
              <group key={node.key}>
                {/* Strand Node A */}
                <mesh position={[node.x1, node.y, node.z1]}>
                  <sphereGeometry args={[0.075, 16, 16]} />
                  <meshStandardMaterial
                    color="#E5C287"
                    emissive="#C5A880"
                    emissiveIntensity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                  />
                </mesh>

                {/* Strand Node B */}
                <mesh position={[node.x2, node.y, node.z2]}>
                  <sphereGeometry args={[0.075, 16, 16]} />
                  <meshStandardMaterial
                    color="#FFFFFF"
                    emissive="#E5C287"
                    emissiveIntensity={0.6}
                    metalness={0.9}
                    roughness={0.1}
                  />
                </mesh>

                {/* Micro Peptide Connector */}
                <mesh position={mid} quaternion={new THREE.Quaternion().setFromRotationMatrix(matrix)}>
                  <cylinderGeometry args={[0.012, 0.012, len, 8]} />
                  <meshStandardMaterial
                    color="#A67C52"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.85}
                  />
                </mesh>

                {/* Tech Reticle Callouts */}
                {i === 6 && (
                  <Html position={[node.x1 + 0.35, node.y, node.z1]} center distanceFactor={5.5}>
                    <div className="flex items-center gap-1.5 bg-[#0D0D0F]/90 border border-[#C5A880]/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#E5C287] shadow-[0_0_10px_rgba(197,168,128,0.2)] whitespace-nowrap select-none backdrop-blur-md">
                      <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
                      Elastin Density: 94.2%
                    </div>
                  </Html>
                )}

                {i === 18 && (
                  <Html position={[node.x2 - 0.35, node.y, node.z2]} center distanceFactor={5.5}>
                    <div className="flex items-center gap-1.5 bg-[#0D0D0F]/90 border border-[#C5A880]/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#E5C287] shadow-[0_0_10px_rgba(197,168,128,0.2)] whitespace-nowrap select-none backdrop-blur-md">
                      <span className="w-1.5 h-1.5 bg-[#E5C287] rounded-full animate-ping" />
                      Collagen Matrix: Active
                    </div>
                  </Html>
                )}
              </group>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

export default function DermalCanvas() {
  return (
    <div className="w-full h-[480px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#141418]/60 to-transparent rounded-sm">
      <Canvas camera={{ position: [0, 0, 4.3], fov: 46 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.8} color="#FFFFFF" />
        <directionalLight position={[-5, -6, -4]} intensity={1.8} color="#C5A880" />
        <pointLight position={[0, 0, 2]} intensity={1.4} color="#FFF2D6" />

        <Sparkles count={50} scale={4.5} size={1.8} speed={0.4} color="#C5A880" />
        <ClinicalScannerRig />
      </Canvas>
    </div>
  );
}