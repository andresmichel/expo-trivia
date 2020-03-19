import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App.tsx';

Date.now = jest.fn(() => 1584648513058);
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('<App />', () => {
    it('renders correctly', () => {
        let root;
        renderer.act(() => {
            root = renderer.create(<App />);
        });
        expect(root.toJSON()).toMatchSnapshot();
    });
});