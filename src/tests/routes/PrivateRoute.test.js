import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AutContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock('react-router-dom',() =>({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>
}) )
describe('Pruebas en <PrivateRoute />', () => {
   
    Storage.prototype.setItem=jest.fn();

    test('debe de mostrar el componente si esta utenticado y guardard en el localStorage', () => {
      
        const contexValue={
            user: {
                name: 'John',
                logged:true
            }
        }
        const wrapper = mount(
            <AutContext.Provider value={contexValue} >
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute >
                        <h1>Private Componet</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AutContext.Provider>

        );
          
       expect(wrapper.find('h1').text().trim() ).toBe('Private Componet');

      expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/');

    });
    
    test('debe de bloquer  el componente si no esta utenticado ', () => {
      
        const contexValue={
            user: {
                logged:false
            }
        }
        const wrapper = mount(
            <AutContext.Provider value={contexValue} >
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute >
                    </PrivateRoute>
                </MemoryRouter>
            </AutContext.Provider>

        );
          
       expect(wrapper.find('span').text().trim() ).toBe('Saliendo de aqui');

    });

});
