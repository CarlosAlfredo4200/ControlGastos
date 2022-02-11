import React, { useState, useEffect } from "react";
import Cerrar from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({ 

  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGasto,  
  gastoEdit,
  setGastoEdit

}) => {
  //Hooks para campos de añador
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  //Para identificar cual se esta editando
  const [id, setId] = useState('')
 const [fecha, setFecha] = useState('');



  const [mensaje, setMensaje] = useState("");


  //Agregar al modal la info que viene desde gastoEdit
  useEffect(() => {
    if(Object.keys(gastoEdit).length > 0 ){
      setNombre(gastoEdit.nombre);
      setCantidad(gastoEdit.cantidad);
      setCategoria(gastoEdit.categoria);
      setId(gastoEdit.id);
      setFecha(gastoEdit.fecha);
    }
  }, [])
  


  //Funciones para cerrar el modal con animación
  const handleCerrarModal = () => {
    setAnimarModal(false);
    setGastoEdit({}) //limpiar modal al cerrarlo sin editar

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleAgregarGasto = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 1500);

      return;
    }

    //generar el objeto guardar gasto
    guardarGasto({ nombre, cantidad, categoria, id, fecha }); //agrego id y fechaId para editar
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={Cerrar} alt="cerrar" onClick={handleCerrarModal} />
      </div>

      <form
        onSubmit={handleAgregarGasto}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEdit.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre del Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Anadir nuevo gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>

          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Anadir la cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          ></input>

          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Selecionar --</option>
            <option value="ahorro"> Ahorro </option>
            <option value="casa"> Casa </option>
            <option value="comida"> Comida </option>
            <option value="gastos"> Gastos varios </option>
            <option value="ocio">Ocio </option>
            <option value="salud"> Salud </option>
            <option value="suscripciones"> Suscripciónes </option>
             
          </select>
        </div>

        <input type="submit" value={gastoEdit.nombre ? 'Actualizar Gasto' : 'Añadir Gasto'} />
       { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
     
    </div>
  );
};

export default Modal;
