class Sensor {
    constructor() {
        this.temperatura = 20.0;
        this.humedad = 60.0;
        this.presion = 1013.0;
        this.historial = {
            temp: [],
            hum: [],
            pres: [],
            tiempo: []
        };
        this.maxHistorial = 60;
    }

    leerSensores() {
        this.temperatura += (Math.random() - 0.5) * 1;
        this.temperatura = Math.max(0, Math.min(45, this.temperatura));
        
        this.humedad += (Math.random() - 0.5) * 4;
        this.humedad = Math.max(20, Math.min(100, this.humedad));
        
        this.presion += (Math.random() - 0.5) * 1;
        this.presion = Math.max(980, Math.min(1040, this.presion));

        const ahora = new Date();
        this.historial.temp.push(this.temperatura);
        this.historial.hum.push(this.humedad);
        this.historial.pres.push(this.presion);
        this.historial.tiempo.push(ahora);

        if (this.historial.temp.length > this.maxHistorial) {
            this.historial.temp.shift();
            this.historial.hum.shift();
            this.historial.pres.shift();
            this.historial.tiempo.shift();
        }

        return {
            temperatura: this.temperatura,
            humedad: this.humedad,
            presion: this.presion,
            timestamp: ahora
        };
    }

    obtenerDatosActuales() {
        return {
            temperatura: this.temperatura,
            humedad: this.humedad,
            presion: this.presion
        };
    }

    obtenerHistorial() {
        return this.historial;
    }
}