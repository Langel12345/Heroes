import { mount } from "enzyme";
import { MemoryRouter,Route,Routes } from "react-router-dom";
import { HeroScreem } from "../../../components/heroes/HeroScreem";


const mockNavigate=jest.fn();
jest.mock('react-router-dom',() =>({
        ...jest.requireActual('react-router-dom'),
        useNavigate :() => mockNavigate,
    })
);

describe('Pruebas en el componente <HeroScreem />', () => {
  
    test('no debe de mostrar el heroe screem si no hay un heroe en el url', () => {
      
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe']}>
                    <Routes>
                        <Route path="/heroe" element={<HeroScreem /> } />  
                        <Route path="/" element={<h1> No hay heroe en page </h1> } />
                    </Routes>

            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No hay heroe en page');

    });
    
    test(' debe de mostrar un heroe si el parametro o la ruta se encuentra ', () => {
      
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                    <Routes>
                        <Route path="/heroe/:heroeId" element={<HeroScreem /> } />  
                        <Route path="/" element={<h1> No hay heroe en page </h1> } />
                    </Routes>

            </MemoryRouter>
        );

       expect(wrapper.find('.row').exists()).toBe(true);

    });

    test('debe de regresar a la pantalla anterior', () => {
      
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                    <Routes>
                        <Route path="/heroe/:heroeId" element={<HeroScreem /> } />  
                    </Routes>

            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });
    

    test(' debe de mostar en no hay heroe si no tenemos un heroe', () => {
      
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider1223242']}>
                    <Routes>
                        <Route path="/heroe/:heroeId" element={<HeroScreem /> } />  
                        <Route path="/" element={<h1>No hay heroe en page</h1> } />
                    </Routes>

            </MemoryRouter>
        );

       expect(wrapper.text()).toBe('No hay heroe en page');

    });
});
