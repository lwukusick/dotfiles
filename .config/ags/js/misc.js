import { Widget } from './imports.js';

export const Separator = ({...props}) => Widget.Box({
    ...props,
    class_name: "separator" 
})