# Parcial 3 - Sistemas Operativos  
Implementación de un programa que simule una estación meteorológica, capaz de realizar múltiples tareas simultáneamente mediante el uso de hilos (threads) para garantizar un funcionamiento eficiente.  
---
Hilo 1: Simula la obtención de datos climáticos cada segundo:  
• Usa valores aleatorios para generar temperatura, humedad y presión.  
• Incluye pequeñas variaciones para que los datos sean realistas.  
Hilo 2: Registra los datos en un archivo de texto o en formato CSV:    
• Almacena la fecha, hora y los valores climáticos generados.  
• Escribe los datos cada 5 segundos para mantener un registro continuo.  
Hilo 3 : Visualiza los datos en una interfaz gráfica mostrando una grafica y genera una
descripción.
