import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import Analytics from '../../browser/react/components/Analytics/Analytics';


describe('<Analytics />', () => {

    let metrics, onChangeSpy;
    beforeEach('Create component and onChange spy', () => {
        // onClickSpy = spy();
        metrics = shallow(<Analytics adChoice={2} />);
    });

    it('should be a <div> with an expected adChoice', () => {
        expect(metrics.is('div')).to.be.equal(true);
        expect(metrics.is('p')).to.be.equal(false);
        // expect(metrics.get(0).props.adChoice).to.be.equal(2);
    });
});

import {createStore} from 'redux';
import rootReducer from '../../browser/react/reducers';

describe('Root reducer', () => {

    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(rootReducer);
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal({
            adChoice: {url: "", title: "", id: 0},
            currentAds: [],
            auth: null
        });
    });

    describe('SET_SELECT_ADS', () => {
        it('sets ad options as two ads from DB', () => {
            testStore.dispatch({ type: 'SET_NEXT_ADS', ads: [{}, {}] });
            const newState = testStore.getState();
            expect(newState.currentAds).to.have.length(2);
        });

    });

});
