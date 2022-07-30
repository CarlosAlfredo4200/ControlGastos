import { useState, useEffect } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import GenId from "./components/Helpers/GenId";
import ListarGastos from "./components/ListarGastos";
import Modal from "./components/Modal";
import AddGasto from "./img/nuevo-gasto.svg";


function App() {
  const [presupuesto, setPresupuesto] = useState(
   Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [filtro, setFiltro] = useState('');
const [gastosFitrados, setGastosFitrados] = useState([]);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')) : []
  ); //inicia como Arreglo

  const [gastoEdit, setGastoEdit] = useState({}); //inicia como obj

  // Despues de editar volver el modal a arrego vacio
  useEffect(() => {
    if (Object.keys(gastoEdit).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEdit]);


  //------------Guardar en local storage presupuesto-------

  useEffect(() => {       // si no esta presente la variable presupuesto llevele 0 (?? 0 )
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
   const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
   if (presupuestoLS > 0 ){
     setIsValidPresupuesto(true)
   }
  }, [])
  
    /*------------Guardar en local storage gastos. 
    NOTA: gastos es un arreglo entonces hay que convertirlo en string-------*/

    useEffect(() => {
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos])
    
    /*------------escuchar cambios con filtros. -------*/

    useEffect(() => {
      //filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFitrados(gastosFiltrados)
    }, [filtro])
    


  //funcion para activar el modal
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEdit({}); //para limpiar el modal despues de editar

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  //extraer el objero de gasto y traer la info desde modal

  const guardarGasto = (gasto) => {

    if(gasto.id){
      //Actualizar. Que hace fn? si tengo 3 registos desde gasto identifica cual es, lo actualiza y restorna el resto
      const gastoAcutalizado = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastoAcutalizado);
      setGastoEdit({})
    }
    else{
      //Nuevo gasto
      gasto.id = GenId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    //cerrar modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };


  //Eliminar gasto. Para extraer del array el elemento que se desea eliminar. 
  const eliminarGasto = (id) => {
      const gastosActualizados = gastos.filter (gasto => gasto.id !== id);
      setGastos(gastosActualizados);

  }


  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        //Generar la lista de gastos
        <>
          <main>
            <Filtros 
              filtro={filtro} 
              setFiltro={setFiltro}
            />
            <ListarGastos
              gastos={gastos}
              setGastoEdit={setGastoEdit}
              gastoEdit={gastoEdit}
              eliminarGasto={eliminarGasto}

              filtro={filtro}
              gastosFiltrados={gastosFitrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={AddGasto} onClick={handleNuevoGasto} alt="" />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEdit={gastoEdit}
          setGastoEdit={setGastoEdit}
        />
      )}
    </div>
  );
}

export default App;
