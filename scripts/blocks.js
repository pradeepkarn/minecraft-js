import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();


function loadTexture(path) {
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}
const textures = {
    cactusSide: loadTexture('textures/cactus_side.png'),
    cactusTop: loadTexture('textures/cactus_top.png'),
    dirt: loadTexture('textures/dirt.png'),
    grass: loadTexture('textures/grass.png'),
    grassSide: loadTexture('textures/grass_side.png'),
    coalOre: loadTexture('textures/coal_ore.png'),
    ironOre: loadTexture('textures/iron_ore.png'),
    jungleTreeSide: loadTexture('textures/jungle_tree_side.png'),
    jungleTreeTop: loadTexture('textures/jungle_tree_top.png'),
    jungleLeaves: loadTexture('textures/jungle_leaves.png'),
    leaves: loadTexture('textures/leaves.png'),
    treeSide: loadTexture('textures/tree_side.png'),
    treeTop: loadTexture('textures/tree_top.png'),
    sand: loadTexture('textures/sand.png'),
    snow: loadTexture('textures/snow.png'),
    snowSide: loadTexture('textures/snow_side.png'),
    stone: loadTexture('textures/stone.png'),
};
export const blocks = {
    empty: {
        id: 0,
        name: 'empty',
    },
    grass: {
        id: 1,
        name: 'grass',
        color: 0x559020,
        material: [
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // right
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // left
            new THREE.MeshLambertMaterial({ map: textures.grass }), // top
            new THREE.MeshLambertMaterial({ map: textures.dirt }), // bottom
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // front
            new THREE.MeshLambertMaterial({ map: textures.grassSide })  // back
        ]
    },
    dirt: {
        id: 2,
        name: 'dirt',
        material: new THREE.MeshLambertMaterial({ map: textures.dirt }),
        color: 0x807020
    },
    stone: {
        id: 3,
        name: 'stone',
        material: new THREE.MeshLambertMaterial({ map: textures.stone }),
        color: 0x808080,
        scale: { x: 30, y: 30, z: 30 },
        scarcity: 0.5
    },
    coalOre: {
        id: 4,
        name: 'coalOre',
        color: 0x202020,
        material: new THREE.MeshLambertMaterial({ map: textures.coalOre }),
        scale: { x: 20, y: 20, z: 20 },
        scarcity: 0.3
    },
    ironOre: {
        id: 5,
        name: 'ironOre',
        color: 0x806060,
        material: new THREE.MeshLambertMaterial({ map: textures.ironOre }),
        scale: { x: 30, y: 30, z: 30 },
        scarcity: 0.2
    }
}

export const resources = [
    blocks.stone,
    blocks.coalOre,
    blocks.ironOre
]