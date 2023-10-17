import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTempsService from '../services/SystemTempsService.js';

const tempSuffix = "<sup>&#176;</sup>"

const cpuTemp = Widget.Box({
    className: 'cpu-temp',
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
    className: 'gpu-temp',
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

export default Widget.Box({
    className: 'temps',
    vertical: true,
    children: [
        cpuTemp,
        gpuTemp,        
    ],
});
