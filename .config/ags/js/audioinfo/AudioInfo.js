import Volume from './Volume.js';
import { Audio, Widget } from '../imports.js';

// Keys are the device IDs; check `wpctl status`
const AudioSinkMap = [
    ['Headset', 'audio-headset-symbolic'],
    ['hdmi', 'audio-speakers-symbolic']
];

const AudioSink = ({...props} = {}) => Widget.Icon({
  ...props,
  connections: [[Audio, icon => {
    if(!Audio.speaker) return;
    icon.icon = AudioSinkMap.find(([sinkName]) => Audio.speaker.name.includes(sinkName))[1];
  }, 'speaker-changed']], 
});
    
const SourceState = {
  Enabled: 'microphone-sensitivity-high-symbolic',
  Muted: 'microphone-disabled-symbolic',
  Disconnected: 'microphone-sensitivity-muted-symbolic',
}

const AudioSource = ({...props} = {}) => Widget.Icon({
  ...props,
  icon: SourceState.Disconnected,
  connections: [[Audio, icon => {
    if(!Audio.microphone) return icon.icon = SourceState.Disconnected;
    if(Audio.microphone.isMuted) return icon.icon = SourceState.Muted;
    icon.icon = SourceState.Enabled;
  }, 'microphone-changed']],
});

const AudioStatus = () => Widget.Box({
    children: [
        AudioSink({ class_name: 'audio-sink' }),
        AudioSource({ class_name: 'audio-source' }),
    ]
});

export default ({...props} = {}) => Widget.Box({
  ...props,
  class_name: 'audio-info',
  hpack: 'fill',
  vpack: 'fill',
  children: [
    Widget.Box({ 
      class_name: 'grouping',
      vertical: true,
      vpack: 'center',
      hpack: 'center',
      children: [
        Volume({ class_name: 'volume' }),
        AudioStatus ({ class_name: 'audio-status' }),
      ],
    }),
  ],
});
