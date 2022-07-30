import React from "react";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
         
          <div className="box">
          <label><h3 className="filtrarGas">Filtrar Gastos</h3> </label>
          </div>
         
          <div className="box">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">-- Todas las categorias --</option>
            <option value="ahorro"> Ahorro </option>
            <option value="casa"> Casa </option>
            <option value="comida"> Comida </option>
            <option value="gastos"> Gastos varios </option>
            <option value="ocio">Ocio </option>
            <option value="salud"> Salud </option>
            <option value="suscripciones"> Suscripciónes </option>
          </select>
          </div>
        
        </div>
      </form>
    </div>
  );
};

export default Filtros;
