import { Audio, Widget } from '../imports.js';

const _mute = 'audio-volume-muted';

const _low = 'audio-volume-low';

const _medium = 'audio-volume-medium';

const _high = 'audio-volume-high';

const DynamicVolumeIcon = ({
    mute = _mute,
    low = _low,
    medium = _medium,
    high = _high
}) => Widget.Icon({
  connections: [[Audio, volumeIcon => {
    const speaker = Audio.speaker;
    if (!speaker) return;
    if (speaker.isMuted) {
        return icon = mute;
    } 
    
    const volumeMap = [[67, high], [34, medium], [1, low], [0, mute]]
    volumeIcon.icon = volumeMap.find(([threshold]) => speaker.volume * 100 >= threshold)[1];
  }, 'speaker-changed']],
});

const VolumeLabel = () => Widget.Label({
    connections: [[Audio, label => {
        print("Testing");
        if (!Audio.speaker) {
            label.label = "--";
            return;
        }
        label.label = `${Math.floor(Audio.speaker.volume * 100)}`
    }, 'speaker-changed']],
});

export default () => Widget.Box({
  orientation: 'horizontal',
  children: [
    DynamicVolumeIcon({ class_name: 'volume-icon' }),
    VolumeLabel({ class_name: 'volume-label' }),
  ],
});


