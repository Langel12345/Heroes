import React, { useMemo } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroByName } from '../../selectors/getHeroeByName';
import { HeroCard } from '../heroes/HeroCard';
import queryString  from 'query-string';
export const SearchScreen = () => {

  const navigate=useNavigate(); //Liberira para navegar

  const location =useLocation(); // Liberira para leer los query
  
  const{ q =''} =queryString.parse(location.search);// Liberira para leer los parametros enviados

   
  const [ value,handeInputChange ]= useForm({ searchText: q });

  const {searchText} =value;

  const heroesFilter= useMemo(() => getHeroByName(q) ,[ q ] );

  const handleSearch = (e) => {
      e.preventDefault();
      navigate(`?q=${searchText}`);
    
  } 

  return <>
      <h1>Search </h1>
      <div className="row">
          <div className="col-5">
            <h4>Search </h4>
            <hr />
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                className="form-control"
                placeholder="Search Heroe"
                autoComplete='off'
                name="searchText"
                value={ searchText }
                onChange={handeInputChange}
              />

              <button 
                className="btn btn-outline-primary mt-3"
                type='submit'                 
               >
                Search...
               </button>
            </form> 
          </div>

          <div className="col-7">
              <h4>Results</h4>
              <hr />
              {
                ( q === '')
                  ? <div  className="alert alert-info">Search in Heroe</div>
                  : ( heroesFilter.length === 0)
                    && <div className="alert alert-danger">No results: { q } </div>
              }

              {
                heroesFilter.map(hero =>( 
                    <HeroCard key={hero.id}
                        {...hero}
                     />
                ))
              }
          </div>
      </div>
    </>
};
