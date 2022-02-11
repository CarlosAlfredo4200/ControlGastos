import React from 'react';
import Gasto from './Gasto';

const ListarGastos = ({
  gastos, 
  setGastoEdit,  
  eliminarGasto, 
  filtro, 
  gastosFiltrados}) => {

    
  return <div className='listado-gastos contenedor'>

            { filtro ? (
              <>

            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>

             { gastosFiltrados.map( dataGastos => (
              <Gasto key={dataGastos.id}
                     dataGastos={dataGastos}
                     setGastoEdit={setGastoEdit}
                     eliminarGasto={eliminarGasto}
              />
              ))}
              </>
            ) : ( 
              <>
              <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
             {gastos.map( dataGastos => (
              <Gasto key={dataGastos.id}
                     dataGastos={dataGastos}
                     setGastoEdit={setGastoEdit}
                     eliminarGasto={eliminarGasto}
              />
            )) }
            </>
        )
    }
            
   </div>;
};

export default ListarGastos;
