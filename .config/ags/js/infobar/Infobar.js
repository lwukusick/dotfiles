import { Widget } from '../imports.js';
import DesktopClock from './DesktopClock.js';
import SystemTemps from './SystemTemps.js';
import HyprlandWorkspaces from '../hyprland/HyprlandInfo.js'
import { Separator } from '../misc.js';

const hyprlandIconMap = {
  "firefox": "firefox-symbolic",
  "discord": "discord-symbolic",
}

const hub = Widget.Box({
  className: 'hub',
  vertical: true,
  children: [
    Widget.Box({ 
      vexpand: true,
      className: 'notifications',
    }),
    Widget.CenterBox({ 
        className: 'hyprland-monitors',
        hexpand: true,
        halign: 'fill',
        children: [
              HyprlandWorkspaces({
                monitor: 'DP-3',
                halign: 'start',
                defaultChild: (w) => Widget.Box({
                  className: 'indicator',
                  valign: 'center',
                  halign: 'center',
                  children: [
                    Widget.Icon({
                      className: 'fill',
                      size: 14,
                      icon: hyprlandIconMap[w.name],
                    })
                  ],
                }),
              }),
              Separator({ halign: 'center', hexpand: false }),
              HyprlandWorkspaces({
                monitor: 'DP-1',
                halign: 'end',
                defaultChild: (w) => Widget.Box({
                  className: 'indicator',
                  valign: 'center',
                  halign: 'center',
                  children: [
                    Widget.Label({
                      className: 'fill',
                      label: w.name,
                    })
                  ],
                }),
            }),
        ]
    }),
  ]  
});

export default Widget.Window({
    name: 'infobar',
    className: 'infobar',
    anchor: ["bottom", "left", "right"],
    exclusive: true,
    layer: "bottom",
    monitor: 1,
    child: Widget.Box({
        children: [
            Widget.Box({ 
                hexpand: true,
                children: [
                  hub,                    
                  Widget.Box({
                    vertical: true,
                    vexpand: true,
                    children: [
                      SystemTemps
                    ],
                  }),
                ],
            }),
            DesktopClock,
        ] 
    })
});
