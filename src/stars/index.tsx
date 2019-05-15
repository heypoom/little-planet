import * as THREE from 'three'

function createStars(color: number): THREE.Points {
  const geometry = new THREE.Geometry()
  const material = new THREE.PointsMaterial({color})

  for (let i = 0; i < 100000; i++) {
    const star = new THREE.Vector3()

    star.x = THREE.Math.randFloatSpread(4500)
    star.y = THREE.Math.randFloatSpread(4500)
    star.z = THREE.Math.randFloatSpread(4500)
    geometry.vertices.push(star)
  }

  return new THREE.Points(geometry, material)
}

export function createStarField(): THREE.Group {
  const starField = new THREE.Group()
  starField.add(createStars(0xffffff))
  starField.add(createStars(0xffc107))
  starField.add(createStars(0x18ffff))

  return starField
}