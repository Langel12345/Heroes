import { mount } from "enzyme";
import { MemoryRouter,Route,Routes } from "react-router-dom";
import { AutContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate=jest.fn();
jest.mock('react-router-dom',() =>({
        ...jest.requireActual('react-router-dom'),
        useNavigate :() => mockNavigate,
    })
);

describe('pruebas en <LoginScreen />', () => {
  
    const contexValue={
        dispatch:jest.fn(),
        user: {
            logged:false
        }
    }

    const wrapper = mount (
       <AutContext.Provider value={contexValue} >
           <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
                
           </MemoryRouter>
           
       </AutContext.Provider> 
   )

    test('debe moestarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim() ).toBe('Login');
    });

    test(' debe realizar el dispatch y la navegacion', () => {
      
    
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contexValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload:{'name': 'Luis Davila'}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel',{'replace':true});

        

    });
    
    
});
