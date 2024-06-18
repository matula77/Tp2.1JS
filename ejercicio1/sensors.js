class Sensor {
    /*1. Definir una clase `Sensor` en el archivo `sensors.js` que permita representar un sensor.
    - Para respetar la estructura de los sensores definida en el archivo `sensors.json`, 
    la clase debe tener las siguientes propiedades:
        - `id`: Identificador del sensor.
        - `name`: Nombre del sensor.
        - `type`: Tipo del sensor.
        - `value`: Valor del sensor.
        - `unit`: Unidad de medida del sensor.
        - `updated_at`: Fecha de actualización del sensor.
    */
     
    constructor(Id,name,type,value,unit,updated_at){
        this.id = Id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.updated_at = updated_at;


        
        }

        /* - Implementar la propiedad computada `updateValue` mediante un *setter* 
        que permita actualizar el valor del sensor y la fecha de actualización.
        
    */
        set updateValue(value){
            this.value=value;}
        set updateDate(updated_at){
            this.updated_at=updated_at;}       
    /* - Los únicos valores para `type` permitidos son `temperature`, `humidity` y `pressure`.*/
    addType(temperature,humidity,pressure){
        this.type.push(temperature,humidity,pressure);
            }
        get info(){
            return `ID: ${this.id} \n 
            Nombre: ${this.name} \n 
            Tipo: ${this.type} \n 
            Valor: ${this.value} \n 
            Unidad: ${this.unit} \n 
            Fecha de actualización: ${this.updated_at}`;
                
                }
    



        
        

}
/* 2. Para la clase `SensorManager`, la cual se encarga de gestionar los sensores mediante un arreglo,
se solicita implementar el método `loadSensors` que se encargue de cargar los sensores desde 
el archivo `sensors.json`.*/

class SensorManager {
    constructor() {
        this.sensors = [];
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    updateSensor(id) {
        const sensor = this.sensors.find((sensor) => sensor.id === id);
        if (sensor) {
            let newValue;
            switch (sensor.type) {
                case "temperature": // Rango de -30 a 50 grados Celsius
                    newValue = (Math.random() * 80 - 30).toFixed(2);
                    break;
                case "humidity": // Rango de 0 a 100%
                    newValue = (Math.random() * 100).toFixed(2);
                    break;
                case "pressure": // Rango de 960 a 1040 hPa (hectopascales o milibares)
                    newValue = (Math.random() * 80 + 960).toFixed(2);
                    break;
                default: // Valor por defecto si el tipo es desconocido
                    newValue = (Math.random() * 100).toFixed(2);
            }
            sensor.updateValue = newValue;
            sensor.updated_at = new Date(); 
            this.render();
        } else {
            console.error(`Sensor ID ${id} no encontrado`);
        }
    }
    /* - El método debe ser **asíncrono**, puede utilizar `fetch` o 
    `XMLHttpRequest`. Pueden emplear `async/await` o promesas.
    - El método debe recibir la ruta del archivo `sensors.json` como argumento.
    - El método no debe retornar nada, pero debe invocar al método `render` 
    para mostrar los sensores en la página.*/
    url="/sensors.json";
    async loadSensors(url) {
        const response = await fetch("sensors.json");
        const data = await response.json();
        console.log(data);//muestra todos los datos pero no los carga en la pagina!!!
        data.forEach((sensor) => {//recorro cada sensor ingreado
            const newSensor = new Sensor(sensor.id, sensor.name,sensor.type, sensor.value,sensor.unit);
            this.addSensor(newSensor);
            
            
        });
        this.render();//no carga los datos ingresados en el div!!!
       
    }

    render() {
        const container = document.getElementById("sensor-container");
        container.innerHTML = "";
        this.sensors.forEach((sensor) => {
            const sensorCard = document.createElement("div");
            sensorCard.className = "column is-one-third";
            sensorCard.innerHTML = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Sensor ID: ${sensor.id}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                <strong>Tipo:</strong> ${sensor.type}
                            </p>
                            <p>
                               <strong>Valor:</strong> 
                               ${sensor.value} ${sensor.unit}
                            </p>
                        </div>
                        <time datetime="${sensor.updated_at}">
                            Última actualización: ${new Date(
                                sensor.updated_at
                            ).toLocaleString()}
                        </time>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item update-button" data-id="${
                            sensor.id
                        }">Actualizar</a>
                    </footer>
                </div>
            `;
            container.appendChild(sensorCard);
        });

        const updateButtons = document.querySelectorAll(".update-button");
        updateButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const sensorId = parseInt(button.getAttribute("data-id"));
                this.updateSensor(sensorId);
            });
        });
    }
}

const monitor = new SensorManager();

monitor.loadSensors("/sensors.json");
