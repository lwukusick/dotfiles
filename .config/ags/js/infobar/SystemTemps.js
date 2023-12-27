import { Widget } from '../imports.js';
import SystemTempsService from '../services/SystemTempsService.js';

const tempSuffix = "<sup>&#176;</sup>"

const cpuTemp = Widget.Box({
    class_name: 'cpu-temp',
    children: [
        Widget.Icon({
            icon: 'accessories-calculator-symbolic',
        }),
        Widget.Label({
            useMarkup: true,
            connections: [[SystemTempsService, label => {
                label.label = `${Math.round(SystemTempsService.cpu_temp)}${tempSuffix}`;
            }]],
        }),
    ]
});

const gpuTemp = Widget.Box({
    class_name: 'gpu-temp',
    children: [
        Widget.Icon({
            icon: 'video-display-symbolic',
        }),
        Widget.Label({
            useMarkup: true,
            connections: [[SystemTempsService, label => {
                label.label = `${Math.round(SystemTempsService.gpu_temp)}${tempSuffix}`;
            }]],
        }),
    ]
});

export default ({...props} = {}) => Widget.Box({
    ...props,
    class_name: 'temps',
    hpack: 'center',
    vpack: 'center',
    children: [
        Widget.Box({
            class_name: 'grouping',
            vertical: true,
            hpack: 'center',
            vpack: 'center',
            children: [
                cpuTemp,
                gpuTemp,
            ],
        }),
    ],
});
