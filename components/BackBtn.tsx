import { useNavigate } from "react-router-dom"

import classes from "./BackBtn.module.css"

// navigate trabalha com a mudança de pagina, direcionamento
const BackBtn = () => {
    const navigate = useNavigate()


  return (
    <>  
        <button className={classes.back_btn} type='button' onClick={() => navigate(-1)}>Voltar</button>
    </>
  )
}

export default BackBtn