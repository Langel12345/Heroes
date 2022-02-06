import React, { useMemo } from 'react';
import { useParams,Navigate,useNavigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';
import './heroes.css';
const heroesImages = require.context('../../assets/heroes',true);

export const HeroScreem = () => {

  const {heroeId}=useParams();
  
  const heroe =useMemo(() => getHeroById(heroeId),[ heroeId ]); //Memorisar si el heroe id cambia si no no vuelve a consutlar
  
  const navigate=useNavigate();

  const handleReturn=() => {
    navigate(-1);
  }

  if (!heroe){
   return <Navigate to='/' />
  }
  
  const { id,superhero,alter_ego,publisher,first_appearance,characters}=heroe
 

  return (
    <div className="row mt-5">
       <div className="my-card ">
         <img src={heroesImages(`./${id}.jpg`) } alt={superhero}  className="animate__animated animate__fadeInLeft img img-responsive" />
       </div>
       <div className="col-8 animate__animated animate__fadeIn">
          <h3> {superhero} </h3>
         <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b >Alter Ego </b>
                {alter_ego }
              </li>
              <li className="list-group-item">
                <b >Publisher </b>
                {publisher }
              </li>
              <li className="list-group-item">
                <b >First Appearance </b>
                {first_appearance }
              </li>
         </ul>
         <h5 className="mt-3">Characters</h5>
         <p>{characters} </p>

          <button className="btn btn-outline-info"
            onClick={handleReturn}
          >Regresar
          </button>
       </div>
    </div>
  )
};
