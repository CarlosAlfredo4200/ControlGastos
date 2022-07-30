import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto 
}) => {
  /*calcular lo disponible y gastado con useEfecfect que este escuchando por los cambios
  que sucedan en gastos */
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  //Para la grafica
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    //Utilizo reduce porque es un objto con arreglos (el primero es acumulador y el 2 instancia de gastos)
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    ); //inica en 0
    setGastado(totalGastado);

    //cALCULAR DISPONIBLE
    const totalDisponible = presupuesto - totalGastado;

    //Calcular % gastado
    const nuevoPocentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(nuevoPocentaje);
    }, 1500);
  }, [gastos]); //varias veces

  const formatoCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };


  const handleResetApp = () => {
    const resetear = window.confirm('¿Desea reiniciar presupuesto y gastos?');
    if(resetear){
      setGastos([]);
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2662" : "#3B82F6",
            trailColor: "F5F5F5",
            textColor: "red",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">

      <button
      className="reset-app"
      type="button"
      onClick={handleResetApp}
      > 
      Reinicar 
      </button>

        <p>
          <span>Presupuesto: </span>
          {formatoCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatoCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatoCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
