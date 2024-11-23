import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

type RestaurantType = 'pizzeria' | 'sushi' | 'burger' | 'vegan'

interface RestaurantTypeModelProps {
    type: RestaurantType
    scrollY: number
}

export function RestaurantTypeModel({ type, scrollY }: RestaurantTypeModelProps) {
    const modelRef = useRef<THREE.Group>()
    const sushiModel = useGLTF('/assets/3d/duck.glb')

    const { rotation } = useSpring({
        rotation: [0, scrollY * 0.1, 0],
        config: { mass: 1, tension: 170, friction: 26 },
    })

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005
        }
    })

    const getModelByType = (type: RestaurantType) => {
        switch (type) {
            case 'pizzeria':
                return (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[1, 1, 0.2, 32]} />
                            <meshStandardMaterial color="#FFA500" />
                        </mesh>
                        <mesh position={[0, 0.2, 0]}>
                            <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
                            <meshStandardMaterial color="#FF0000" />
                        </mesh>
                    </group>
                )
            case 'sushi':
                return (
                    <group scale={[0.01, 0.01, 0.01]}>
                        <primitive object={sushiModel.scene} />
                    </group>
                )
            case 'burger':
                return (
                    <group>
                        <mesh position={[0, -0.3, 0]}>
                            <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
                            <meshStandardMaterial color="#CD853F" />
                        </mesh>
                        <mesh>
                            <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
                            <meshStandardMaterial color="#8B4513" />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
                            <meshStandardMaterial color="#CD853F" />
                        </mesh>
                    </group>
                )
            case 'vegan':
                return (
                    <group>
                        <mesh>
                            <sphereGeometry args={[0.7, 32, 32]} />
                            <meshStandardMaterial color="#32CD32" />
                        </mesh>
                        <mesh position={[0, 0.7, 0]}>
                            <coneGeometry args={[0.4, 0.6, 32]} />
                            <meshStandardMaterial color="#228B22" />
                        </mesh>
                    </group>
                )
        }
    }

    return (
        <animated.group ref={modelRef as any} rotation={rotation as any}>
            {getModelByType(type)}
        </animated.group>
    )
}

useGLTF.preload('/food.glb')

