import * as THREE from 'three'
import {Mesh} from 'three'

import fragmentShader from './cube.frag'
import vertexShader from './cube.vert'

// const uniforms = {
//   time: {value: 1.0},
//   resolution: {value: new THREE.Vector2()},
// }

export interface CubeUniform {
  time?: {
    value: number
  }
  resolution?: {
    value: THREE.Vector2
  }
  colorA: {
    type: string
    value: THREE.Color
  }
  colorB: {
    type: string
    value: THREE.Color
  }
}

export function createCubeUniform(): CubeUniform {
  return {
    time: {
      value: 1.0,
    },
    resolution: {
      value: new THREE.Vector2(1024, 768),
    },
    colorA: {
      type: 'vec3',
      value: new THREE.Color(0x74ebd5),
    },
    colorB: {
      type: 'vec3',
      value: new THREE.Color(0xacb6e5),
    },
  }
}

export const createCubeShaderMaterial = (uniforms: CubeUniform) =>
  new THREE.ShaderMaterial({
    uniforms,
    fragmentShader,
    vertexShader,
  })

export function createCube(): [Mesh, CubeUniform] {
  const uniforms = createCubeUniform()
  const geometry = new THREE.BoxGeometry(20, 60, 10)
  const material = createCubeShaderMaterial(uniforms)
  const mesh = new Mesh(geometry, material)

  return [mesh, uniforms]
}
