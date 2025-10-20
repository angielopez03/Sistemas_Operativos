class Registro {
    constructor() {
        this.datos = [];
    }

    guardarDatos(datos) {
        const ahora = new Date();
        const registro = {
            fecha: ahora.toLocaleDateString('es-CO'),
            hora: ahora.toLocaleTimeString('es-CO'),
            temperatura: datos.temperatura.toFixed(2),
            humedad: datos.humedad.toFixed(2),
            presion: datos.presion.toFixed(2)
        };
        
        this.datos.push(registro);
        return registro;
    }

    exportarCSV() {
        if (this.datos.length === 0) {
            return null;
        }

        // Agregar BOM (Byte Order Mark) para UTF-8
        let csv = '\uFEFF';
        csv += 'Fecha,Hora,Temperatura (°C),Humedad (%),Presión (hPa)\n';
        this.datos.forEach(registro => {
            csv += `${registro.fecha},${registro.hora},${registro.temperatura},${registro.humedad},${registro.presion}\n`;
        });

        return csv;
    }

    obtenerCantidadRegistros() {
        return this.datos.length;
    }

    limpiarDatos() {
        this.datos = [];
    }
}