import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'
import {Camera, Mesh, Scene} from 'three'

import {OrbitControls} from 'three-orbitcontrols-ts'

import {createCube, CubeUniform} from '../cube'
import {createStarField} from '../stars'

const sigmoid = (x, normal) => {
  return 1 - 1 / (1 + Math.exp(-((-x / normal) * 24 + 12)))
}

export function App() {
  const canvasRef = useRef<HTMLDivElement>(null)

  let scene: Scene
  let camera: Camera
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let light: THREE.PointLight

  let cube: Mesh
  let cubeUniform: CubeUniform
  let starField: THREE.Group

  let xSpeed = 0.0001
  let zSpeed = 0.0001
  let tick = 0

  document.addEventListener('keydown', handleGameKeys, false)

  const onMove = () => {
    const {x, y, z} = camera.position

    console.log(x, y, z)
  }

  const moveForward = () => {
    camera.position.z += zSpeed
    onMove()
  }

  const moveBackward = () => {
    camera.position.z -= zSpeed
    onMove()
  }

  const moveLeft = () => {
    camera.position.x -= xSpeed
    onMove()
  }

  const moveRight = () => {
    camera.position.x += xSpeed
    onMove()
  }

  const keymaps: {[index: string]: Function} = {
    ArrowUp: moveForward,
    ArrowDown: moveBackward,
    ArrowLeft: moveLeft,
    ArrowRight: moveRight,
    w: moveForward,
    a: moveLeft,
    s: moveBackward,
    d: moveRight,
  }

  function handleGameKeys(event: KeyboardEvent) {
    const {key} = event
    const action = keymaps[key]

    console.log(key, '->', action ? action.name : 'None')

    if (action) action()
  }

  function animate() {
    requestAnimationFrame(animate)

    tick += 1

    controls.update()

    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    renderer.render(scene, camera)
  }

  useEffect(() => {
    const aspect = innerWidth / innerHeight

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(innerWidth, innerHeight)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    camera.position.set(0, 20, 0.00000125)

    // Create a cube
    ;[cube, cubeUniform] = createCube()
    scene.add(cube)

    starField = createStarField()
    scene.add(starField)

    light = new THREE.PointLight(0xffc107, 2, 150)
    light.position.set(camera.position.x, camera.position.y, camera.position.z)
    light.castShadow = true
    scene.add(light)

    if (canvasRef && canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement)

      animate()

      window.game = {
        scene,
        camera,
        renderer,
        controls,
        light,
        cube,
        cubeUniform,
        starField,
      }
    }
  }, [])

  return <div ref={canvasRef} />
}
