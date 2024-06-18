class Customer {
    /*1. Definir una clase `Customer` en el archivo `reservations.js` que permita representar un cliente.
    - La clase debe tener las siguientes propiedades:
        - `id`: Identificador del cliente.
        - `name`: Nombre del cliente.
        - `email`: Correo electrónico del cliente.
    - La clase debe tener un constructor.
    - Se debe implementar una propiedad computada `info` que retorne una cadena con el nombre y el correo electrónico del cliente. */
constructor(id,name,email,){
    this.id=id;
    this.name=name;
    this.email=email;}
    get info(){
        return `${this.name} ${this.email}`;        
        }
        /* 2. Definir una clase `Reservation` en el archivo `reservations.js` que permita
         representar una reserva.
    - La clase debe tener las siguientes propiedades:
        - `id`: Identificador de la reserva.
        - `customer`: instancia de la clase `Customer` que realiza la reserva.
        - `date`: Fecha y hora de la reserva.
        - `guests`: Número de comensales de la reserva.
    - La clase debe tener un constructor.*/

}

class Reservation {
    constructor(id,customer,date,guests){
        this.id=id;
        this.customer=customer;
        this.date=date;
        this.guests=guests;
         }
/*  - Se debe implementar una propiedad computada `info` 
que retorne una cadena con la fecha y hora de la reserva,
 la información del cliente*/
 get info(){
    return `${this.date} ${this.customer.info}`;
    console.log(customer.info);
    }
/* - Se debe implementar un método estático `validate`
 que reciba un objeto con la información de la reserva y
  retorne `true` si la información es válida y `false` en caso contrario.
   Si la fecha de la reserva es anterior a la fecha actual y
    la cantidad de comensales es menor o igual a 0, la reserva no es válida.*/
    static validateReservation(reserva){
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if(reserva.date < today && reserva.guests <= 0){
            return false;
            }else{
            return true;
            }
            }
        }

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            reservationCard.innerHTML = `
                    <p class="subtitle has-text-primary">
                        Reserva ${
                            reservation.id
                        } - ${reservation.date.toLocaleString()}
                    </p>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                ${reservation.info}
                            </p>
                        </div>
                    </div>
              `;
            container.appendChild(reservationCard);
        });
    }
}

document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            const customer = new Customer(
                customerId,
                customerName,
                customerEmail
            );
            const reservation = new Reservation(
                reservationId,
                customer,
                reservationDate,
                guests
            );

            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            alert("Datos de reserva inválidos");
            return;
        }
    });

const restaurant = new Restaurant("El Lojal Kolinar");

const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const customer2 = new Customer(2, "Alan Poe", "GAPoe@gmail.com");
const customer3 = new Customer(3, "J Vivaldi", "JV@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);
const reservation2 = new Reservation(2, customer2, "2024-12-31T20:10:00", 2);
const reservation3 = new Reservation(3, customer3, "2024-12-31T20:15:00", 1);

if (Reservation.validateReservation(reservation1.date, reservation1.guests),
    (reservation2.date, reservation1.guests), 
(reservation3.date, reservation1.guests)) 
{
restaurant.addReservation(reservation1);
    restaurant.addReservation(reservation2);
    restaurant.addReservation(reservation3);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
