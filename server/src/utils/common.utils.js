// Generar id único para el usuario en la BD
module.exports.generateUniqueId = (length) => {
    let uniqueId = "";
  
    for (let i = 0; i < length; i++) {
      uniqueId += Math.floor(Math.random() * 10); // Genera un número aleatorio entre 0 y 9
    }
  
    return uniqueId;
  }
  