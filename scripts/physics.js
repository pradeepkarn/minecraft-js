import * as THREE from 'three';
import { blocks } from './blocks';

const collisionMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.2
})
const collisionGeometry = new THREE.BoxGeometry(1.001,1.001,1.001);
export class Physics {
    constructor(scene) {
        this.helpers = new THREE.Group();
        // this.helpers.visible = false;
        scene.add(this.helpers);
    }
    /**
  * Main function for collision detection
  */
    detectCollisions(player, world) {
        // player.onGround = false;
        // this.helpers.clear();

       this.broadPhase(player, world);
        // const collisions = this.narrowPhase(candidates, player);

        // if (collisions.length > 0) {
        //     this.resolveCollisions(collisions, player);
        // }
    }
    broadPhase(player, world) {
        const candidates = [];
        const extents = {
            x: {
                min: Math.floor(player.position.x - player.radius),
                max: Math.ceil(player.position.x + player.radius)
            },
            y: {
                min: Math.floor(player.position.y - player.height),
                max: Math.ceil(player.position.y)
            },
            z: {
                min: Math.floor(player.position.z - player.radius),
                max: Math.ceil(player.position.z + player.radius)
            }
        }

        for (let x = extents.x.min; x <= extents.x.max; x++) {
            for (let y = extents.y.min; y <= extents.y.max; y++) {
                for (let z = extents.z.min; z<= extents.z.max; z++) {
                    const block = world.getBlock(x, y, z);
                    if (block && block.id !== blocks.empty.id) {
                        const blockPos= {x,y,z};
                        candidates.push(blockPos);
                        this.addCollisionHelper(blockPos);
                    }
                }
            }
        }
        return candidates;
    }

    /**
  * Moves the physics simulation forward in time by 'dt'
  * @param {number} dt 
  * @param {Player} player
  * @param {WorldChunk} world
  */
    update(dt, player, world) {
        this.detectCollisions(player, world);
    }

    addCollisionHelper(block) {
        const blockMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
        blockMesh.position.copy(block);
        this.helpers.add(blockMesh);
    }

}