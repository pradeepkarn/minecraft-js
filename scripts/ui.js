import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { blocks, resources } from './blocks.js';
export function createUI(world, plyer) {
    const gui = new GUI();


    const terrainFolder = gui.addFolder('Terrain');
    terrainFolder.add(world.params, 'seed', 0, 10000).name('Seed');
    terrainFolder.add(world.params.terrain, 'scale', 10, 100).name('Scale');
    terrainFolder.add(world.params.terrain, 'magnitude', 0, 1).name('Magnitude');
    terrainFolder.add(world.params.terrain, 'offset', 0, 1).name('Offset');

    gui.add(world.size, 'width', 8, 128, 1).name('Width');
    gui.add(world.size, 'height', 8, 64, 1).name('Height');

    const playerFolder = gui.addFolder('Plyer');
    playerFolder.add(plyer, 'maxSpeed', 1, 20).name('Max Speed');
    playerFolder.add(plyer.cameraHelper, 'visible').name('Show Camera Helper');


    resources.forEach(resource => {
        const resourcesFolder = gui.addFolder('Resources');
        resourcesFolder.add(resource, 'scarcity', 0, 1).name(resource.name);

        const scalefolder = resourcesFolder.addFolder('Scale');
        scalefolder.add(resource.scale, 'x', 1, 100).name('X Scale');
        scalefolder.add(resource.scale, 'y', 1, 100).name('Y Scale');
        scalefolder.add(resource.scale, 'z', 1, 100).name('Z Scale');
    });
    gui.onChange(() => {
        world.generate();
    });
}