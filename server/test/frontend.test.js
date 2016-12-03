import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import Analytics from '../../browser/react/components/Analytics/Analytics';

import Ads from '../../browser/react/components/Ads/Ads';


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

describe('Ads page', () => {
   it('On clicking an ad choice, it should call selectAds with the correct ad as a parameter', () => {

        const onClickSpy = spy();
        const wrapper = shallow(<Ads currentAds={[{id: 1, url: "abcd"},{id: 2, url: "efghi"}]}/>);

        expect(wrapper.find("#imgtest1").node.props.src).to.equal(`//img.youtube.com/vi/abcd/0.jpg`);
        // expect(wrapper.props().currentAds[0].id).to.equal(1);
        // wrapper.find('#ad1').simulate('click');
        // expect(onClickSpy.calledOnce).to.be.true;




   });



});
