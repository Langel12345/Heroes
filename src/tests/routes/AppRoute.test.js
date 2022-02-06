import React from "react";
import { mount } from "enzyme";
import { AutContext } from "../../auth/authContext";
import { AppRoute } from "../../routers/AppRoute";

describe('Pruebas en el < AppRoute />', () => {
    
        
    test('debe de mostar el login si no esta autenticado', () => {
        const contexValue={
            user: {
                logged:false
            }
        }

        const wrapper =mount(
        <AutContext.Provider value={contexValue} >
            <AppRoute />
        </AutContext.Provider> 
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });
    
    test('debe de mostar el componente de marvel si  esta autenticado', () => {
        const contexValue={
            user: {
                logged:true,
                name: 'John'
            }
        }
        
        const wrapper =mount(
        <AutContext.Provider value={contexValue} >
            <AppRoute />
        </AutContext.Provider> 
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);
        
    });
    
});
