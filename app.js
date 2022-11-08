/* En esta primera etapa, necesitamos requerir tu módulo autos y guardarlo en la variable autosImportados que se encuentra en la misma carpeta del archivo donde estás trabajando. Recordá que es el mismo archivo que creaste en la etapa anterior. 
Además, necesitarás crear un objeto literal llamado concesionaria que contendrá todas las funcionalidades que el cliente solicita.
Por último, nuestro objeto literal debe tener un atributo llamado autos que contenga la lista de automóviles importada anteriormente.
*/

let autosImportados = require("./autos.js");

const concesionaria = {
  autos: autosImportados,

  /*Ahora que la concesionaria tiene los autos, es posible crear la funcionalidad buscarAuto que reciba por parámetro la patente y devuelva el auto al cual le corresponde. En caso de no encontrar el mismo, deberá retornar null.
   */

  buscarAuto: function (patente) {
    let autoEncontrado = this.autos.find(function (auto) {
      return auto.patente == patente;
    });
    return autoEncontrado == undefined ? null : autoEncontrado;
  },

  /*
Ahora, María les pide que agreguen la funcionalidad de venderAuto que recibe la patente y, en caso de encontrar al automóvil, le asigna el estado de vendido.
*/

  venderAuto: function (patente) {
    let autoEncontrado = this.buscarAuto(patente);
    if (autoEncontrado != null) {
      autoEncontrado.vendido = true;
      return autoEncontrado;
    }
  },

  /*
La primera es poder contar, como concesionaria, con la habilidad de poder tener la lista de autos para la venta. A lo cual, María, cree que es una tarea sencilla que Juan y vos pueden encarar solos, usando la función autosParaLaVenta, aunque por las dudas ella les recuerda que no deberían de aparecer los autos que ya fueron vendidos.
*/

  autosParaLaVenta: function () {
    return this.autos.filter(function (auto) {
      return auto.vendido == false;
    });
  },

  /*
Resulta que a la concesionaria le suelen preguntar muy seguido cuáles de los autos para la venta son 0 km. Tené en cuenta que María considera que un auto 0 km es aquel que tenga un kilometraje menor a 100. Vas a tener que desarrollar la funcionalidad autosNuevos.
¿Cómo podés resolver esto reutilizando la función autosParaLaVenta?
*/

  autosNuevos: function () {
    let resultadoAutos = this.autosParaLaVenta().filter(function (auto) {
      return auto.km < 100;
    });
    return resultadoAutos;
  },

  /*
El cliente le pidió saber cuánto dinero generaron las ventas.
María te pide que completes la función listaDeVentas que devuelve una lista que contiene el precio de venta de cada auto vendido. A esto, Juan, que está al lado tuyo, se le escapa la frase "mmm.....estoy seguro que alguna función de arrays nos va a servir, pero no me acuerdo".
*/

listaDeVentas: function(){
  let vendidos = this.autos.filter(function(auto){
     return auto.vendido
  })
  return vendidos.map(function(auto){
     return auto.precio
  })
},

/*Etapa 8
Terminada esta función, María te pide que resuelvas la funcionalidad de totalDeVentas, que justamente nos devuelva la sumatoria del valor de todas las ventas realizadas. Acá el único requerimiento técnico explícito es que utilices la función reduce, ¡a codear!
*/

  totalDeVentas: function () {
    let ventas = this.listaDeVentas();
    if (ventas.length == 0) {
      return 0;
    } else {
      return this.listaDeVentas().reduce(function (suma, precio) {
        return suma + precio;
      });
    }
  },

  /*Etapa 9
exerciseProgressIcon
Etapa 9
Muy contento el equipo por cómo viene el desarrollo, por la tarde, María te comenta que se agrega una funcionalidad muy importante: la de verificar si una persona puede comprar o no un auto. Esta permite al sistema definir si una persona al consultar por un auto, puede comprarlo. Las personas solo sacan los autos en cuotas y tomando dos factores como condición de compra. Una es el costo total: si el total de un auto excede lo que la persona considera caro, no va a comprar el auto. Otra condición es su capacidad de pago en cuotas: si la capacidad de pago en cuotas supera al costo de la cuota, va a poder pagarlo. Si ambas condiciones se cumplen, se realiza la compra.

Es por esto que María te pide que desarrolles la función puedeComprar que reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
Una persona va a ser representada mediante un objeto literal de la siguiente forma:

let persona = {
nombre: "Juan",
capacidadDePagoEnCuotas: 20000,
capacidadDePagoTotal: 100000
}
*/

puedeComprar: function (auto, persona) {
  return  (auto.precio <= persona.capacidadDePagoTotal && auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas);
},
 

/*Etapa 10
Hay que escribir la función autosQuePuedeComprar, que recibe una persona y devuelve la lista de autos que puede comprar.
La función debe de realizar los siguientes pasos:
  1) Obtener los autos para la venta
  2) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?
  3) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.
*/

autosQuePuedeComprar: function (persona) {
    let autosDiponibles = this.autosParaLaVenta().filter(auto => {
      return this.puedeComprar(auto, persona);
    })
    return autosDiponibles;
  }
};

//console.log(autosImportados);
//console.log(concesionaria.buscarAuto("JJK116"))
//console.log(concesionaria.venderAuto("JJK116"))
//console.log(concesionaria.autosParaLaVenta())
//console.log(concesionaria.autosNuevos())
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas())
/*console.log(concesionaria.puedeComprar({
  nombre: "Juan",
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
  }));*/
/*console.log(concesionaria.autosQuePuedeComprar({
nombre: "Juan",
capacidadDePagoEnCuotas: 20000,
capacidadDePagoTotal: 100000
}));*/