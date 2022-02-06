import { mount } from "enzyme";
import { MemoryRouter,Route,Routes } from "react-router-dom";
import { AutContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockNavigate=jest.fn();
jest.mock('react-router-dom', ()=>({ 
        ...jest.requireActual('react-router-dom'),
        useNavigate :() => mockNavigate,
    })
 )

describe('Pruebas en <Navbar />', () => {
    const contexValue={
        dispatch:jest.fn(),
        user: {
            name: 'John',
            logged:true
        }
    }

    const wrapper = mount (
        <AutContext.Provider value={contexValue} >
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
                    
            </MemoryRouter>
        </AutContext.Provider>
        )

    test('debe de mostrarse correctamente', () => {
       
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim() ).toBe('John');

    });
    
    test(' debe de llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {
        
            wrapper.find('button').prop('onClick')();
            expect(contexValue.dispatch).toHaveBeenCalledWith({ 'type': types.logout } )
            expect(mockNavigate).toHaveBeenCalledWith('/login',{"replace": true });
    });
    

});
