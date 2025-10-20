class EstacionMeteorologica {
    constructor() {
        this.sensor = new Sensor();
        this.registro = new Registro();
        this.visualizacion = new Visualizacion();
        
        this.activo = false;
        this.intervaloSensor = null;
        this.intervaloRegistro = null;
        this.intervaloVisualizacion = null;
    }

    iniciar() {
        if (this.activo) return;
        
        this.activo = true;
        this.visualizacion.actualizarEstado(true);
        this.visualizacion.actualizarBotones(true);
        this.visualizacion.agregarLog('Estación meteorológica iniciada', 'success');
        
        this.intervaloSensor = setInterval(() => {
            this.sensor.leerSensores();
        }, 1000);
        this.visualizacion.agregarLog('Hilo de sensores activo', 'info');
        
        this.intervaloRegistro = setInterval(() => {
            const datos = this.sensor.obtenerDatosActuales();
            this.registro.guardarDatos(datos);
            this.visualizacion.agregarLog(
                `Datos guardados (Total: ${this.registro.obtenerCantidadRegistros()})`, 
                'success'
            );
        }, 5000);
        this.visualizacion.agregarLog('Hilo de registro activo', 'info');
        
        this.intervaloVisualizacion = setInterval(() => {
            const datos = this.sensor.obtenerDatosActuales();
            const historial = this.sensor.obtenerHistorial();
            
            this.visualizacion.actualizarDatosActuales(datos);
            this.visualizacion.actualizarDescripcion(datos);
            this.visualizacion.actualizarGraficas(historial);
        }, 1000);
        this.visualizacion.agregarLog('Hilo de visualización activo', 'info');
    }

    detener() {
        if (!this.activo) return;
        
        this.activo = false;
        this.visualizacion.actualizarEstado(false);
        this.visualizacion.actualizarBotones(false);
        
        clearInterval(this.intervaloSensor);
        clearInterval(this.intervaloRegistro);
        clearInterval(this.intervaloVisualizacion);
        
        this.visualizacion.agregarLog('Estación meteorológica detenida', 'warning');
    }

    descargarDatos() {
        const csv = this.registro.exportarCSV();
        
        if (!csv) {
            this.visualizacion.agregarLog('No hay datos para descargar', 'warning');
            return;
        }

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        const timestamp = new Date().getTime();
        link.setAttribute('href', url);
        link.setAttribute('download', `datos_meteorologicos_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.visualizacion.agregarLog(
            `Archivo CSV descargado (${this.registro.obtenerCantidadRegistros()} registros)`, 
            'success'
        );
    }
}

const estacion = new EstacionMeteorologica();
console.log('Estación Meteorológica inicializada correctamente');