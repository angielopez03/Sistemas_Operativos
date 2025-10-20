class Visualizacion {
    constructor() {
        this.inicializarGraficas();
    }

    inicializarGraficas() {
        const configBase = {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 500
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: { color: 'white' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                        ticks: { color: 'white', display: false },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        };

        this.chartTemp = new Chart(document.getElementById('chartTemp'), {
            ...configBase,
            data: {
                labels: [],
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: [],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });

        this.chartHum = new Chart(document.getElementById('chartHum'), {
            ...configBase,
            data: {
                labels: [],
                datasets: [{
                    label: 'Humedad (%)',
                    data: [],
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });

        this.chartPres = new Chart(document.getElementById('chartPres'), {
            ...configBase,
            data: {
                labels: [],
                datasets: [{
                    label: 'Presión (hPa)',
                    data: [],
                    borderColor: '#95e1d3',
                    backgroundColor: 'rgba(149, 225, 211, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    }

    actualizarDatosActuales(datos) {
        document.getElementById('temp-valor').textContent = datos.temperatura.toFixed(1);
        document.getElementById('hum-valor').textContent = datos.humedad.toFixed(1);
        document.getElementById('pres-valor').textContent = datos.presion.toFixed(1);
    }

    actualizarDescripcion(datos) {
        const descripcion = this.generarDescripcion(datos);
        document.getElementById('descripcion').textContent = descripcion;
    }

    actualizarGraficas(historial) {
        const etiquetas = historial.tiempo.map((t, i) => i);
        
        this.chartTemp.data.labels = etiquetas;
        this.chartTemp.data.datasets[0].data = historial.temp;
        this.chartTemp.update('none');

        this.chartHum.data.labels = etiquetas;
        this.chartHum.data.datasets[0].data = historial.hum;
        this.chartHum.update('none');

        this.chartPres.data.labels = etiquetas;
        this.chartPres.data.datasets[0].data = historial.pres;
        this.chartPres.update('none');
    }

    generarDescripcion(datos) {
        let descTemp, descHum, descPres;

        if (datos.temperatura < 10) descTemp = "Frío";
        else if (datos.temperatura < 20) descTemp = "Fresco";
        else if (datos.temperatura < 30) descTemp = "Agradable";
        else descTemp = "Caluroso";

        if (datos.humedad < 40) descHum = "Ambiente seco";
        else if (datos.humedad < 70) descHum = "Humedad moderada";
        else descHum = "Ambiente húmedo";

        if (datos.presion < 1000) descPres = "Presión baja (posible lluvia)";
        else if (datos.presion < 1020) descPres = "Presión normal";
        else descPres = "Presión alta (buen tiempo)";

        return `${descTemp} • ${descHum} • ${descPres}`;
    }

    agregarLog(mensaje, tipo = 'info') {
        const logContainer = document.getElementById('logContainer');
        const entry = document.createElement('div');
        entry.className = `log-entry ${tipo}`;
        const timestamp = new Date().toLocaleTimeString();
        entry.textContent = `[${timestamp}] ${mensaje}`;
        logContainer.insertBefore(entry, logContainer.firstChild);
        
        // Limitar a 50 entradas
        while (logContainer.children.length > 50) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    actualizarEstado(activo) {
        const statusElement = document.getElementById('status');
        if (activo) {
            statusElement.textContent = 'Sistema Activo';
            statusElement.classList.add('active');
        } else {
            statusElement.textContent = '⏸Sistema Detenido';
            statusElement.classList.remove('active');
        }
    }

    actualizarBotones(activo) {
        document.getElementById('btnIniciar').disabled = activo;
        document.getElementById('btnDetener').disabled = !activo;
    }
}