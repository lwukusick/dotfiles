import { Service, Utils } from '../imports.js';

class SystemTemps extends Service {
    static {
        Service.register(
            this,
            {
                'gpu-changed': ['float'],
                'cpu-changed': ['float'],
            },
            {},
        );
    }
    
    gpuFreq = 5;
    cpuFreq = 5;
    
    _cpuTemp = 0;
    _gpuTemp = 0;

    get cpu_temp() { return this._cpuTemp; }
    get gpu_temp() { return this._gpuTemp; }
    
    constructor() {
        super();

        Utils.subprocess(
            ["nvidia-smi", "--query-gpu=temperature.gpu", "--format=csv", "-l", this.gpuFreq.toString()],
            (output) => {
                let newTemp = Number(output);
                if (newTemp != this._gpuTemp) {
                    this._gpuTemp = newTemp;
                    this.emit('gpu-changed', newTemp);
                    this.emit('changed');
                }
            },
            (err) => logError(err),
        );
        
        this.loopCpuTemp();
    }
    
    loopCpuTemp() {
        Utils.execAsync(["sensors", "k10temp-pci-00c3", "-j"])
            .then((output) => {
                let newTemp = JSON.parse(output)["k10temp-pci-00c3"]["Tccd1"]["temp3_input"];
                if (newTemp != this._cpuTemp) {
                    this._cpuTemp = newTemp;
                    this.emit('cpu-changed', newTemp);
                    this.emit('changed');
                }               
                Utils.execAsync(["sleep", this.cpuFreq.toString()])
                    .then(() => this.loopCpuTemp())
                    .catch((err) => logError(err));
            })
            .catch((err) => logError(err));
    }
}

const service = new SystemTemps();

export default service;
