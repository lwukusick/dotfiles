import { Widget } from '../imports.js';
import DesktopClock from './DesktopClock.js';
import SystemTemps from './SystemTemps.js';
import AudioInfo from '../audioinfo/AudioInfo.js';
import HyprlandWorkspaces from '../hyprland/HyprlandInfo.js'
import { Separator } from '../misc.js';
import { ShutdownButton, RestartButton, SuspendButton } from '../systemcontrols/SystemButtons.js';
import Notifications  from '../notifications/NotificationsLayout.js';

const hyprlandIconMap = {
  "firefox": "firefox-symbolic",
  "discord": "discord-symbolic",
}

const hub = Widget.Box({
  class_name: 'hub',
  vertical: true,
  children: [
    Widget.Box({
      class_name: 'system-buttons',
      hpack:'start',
      children: [
        ShutdownButton(),
        RestartButton(),
        SuspendButton(),
      ]
    }),
//    Widget.Box({ 
//      vexpand: true,
//      class_name: 'notifications',
//    }),
    Notifications(),
    Widget.CenterBox({ 
        class_name: 'hyprland-monitors',
        hexpand: true,
        hpack: 'fill',
        children: [
              HyprlandWorkspaces({
                monitor: 'DP-3',
                hpack: 'start',
                defaultChild: (w) => Widget.Box({
                  class_name: 'indicator',
                  vpack: 'center',
                  hpack: 'center',
                  children: [
                    Widget.Icon({
                      class_name: 'fill',
                      size: 14,
                      icon: hyprlandIconMap[w.name],
                    })
                  ],
                }),
              }),
              Separator({ hpack: 'center', hexpand: false }),
              HyprlandWorkspaces({
                monitor: 'DP-1',
                hpack: 'end',
                defaultChild: (w) => Widget.Box({
                  class_name: 'indicator',
                  vpack: 'center',
                  hpack: 'center',
                  children: [
                    Widget.Label({
                      class_name: 'fill',
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
    class_name: 'infobar',
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
                      AudioInfo(),
                      SystemTemps(),
                    ],
                  }),
                ],
            }),
            DesktopClock,
        ] 
    })
});
