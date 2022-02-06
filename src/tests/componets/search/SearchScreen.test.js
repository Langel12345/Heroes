import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate=jest.fn();
jest.mock('react-router-dom', ()=>({ 
        ...jest.requireActual('react-router-dom'),
        useNavigate :() => mockNavigate,
    })
 )

describe('Pruebas en <SearchScreen />', () => {

    test('debe de mostrarse correctamente ', () => {

        const wrapper = mount (
        <MemoryRouter initialEntries={['/search']}>
            <SearchScreen />
        </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        
        expect(wrapper.find('.alert-info').text().trim() ).toBe('Search in Heroe');
    });
    
    test('debe de mostar a Batman y el input con el valor del queryString ', () => {
      
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
            );
    
        expect (wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
        
    });
    
    test(' debe de moestar un error si no se encuentra el heroe', () => {
        

        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
            );
            expect (wrapper.find('input').prop('value')).toBe('batman123');    
            expect (wrapper.find('.alert-danger').text().trim()).toBe('No results: batman123');
    });
    
    test(' debe de llamar el navigate a la nueva pantalla ', () => {
      
            const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=superman']}>
                <SearchScreen />
            </MemoryRouter>
            );
            
            wrapper.find('input').simulate('change',{ 
                target:"searchText",
                value:'bataman'
             });

            wrapper.find('form').prop('onSubmit')({
                preventDefault:()=>{},
            });
            expect(mockNavigate).toHaveBeenCalledWith('?q=superman');

    });
    
});
