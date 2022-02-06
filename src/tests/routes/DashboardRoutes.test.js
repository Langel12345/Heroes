import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AutContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';


describe('Pruebas en <DashboardRoutes />', () => {
  
     const contexValue ={
         user:{
             logged:true, 
             name:'Luis'
         }
     }   
    test('Debe de mostrarse correctamente - Marvel', () => {


        const wrapper=mount(
            <AutContext.Provider value={contexValue}>
                <MemoryRouter initialEntries={['/']}>
                        <DashboardRoutes />
                </MemoryRouter>
            </AutContext.Provider>  
        );  
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Luis');    
        expect(wrapper.find('h1').text().trim() ).toBe('MarvelScreen');    
    });
    
    test('Debe de mostrarse correctamente - dc', () => {


        const wrapper=mount(
            <AutContext.Provider value={contexValue}>
                <MemoryRouter initialEntries={['/dc']}>
                        <DashboardRoutes />
                </MemoryRouter>
            </AutContext.Provider>  
        );  
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim() ).toBe('DcScreen')    
    });

});
