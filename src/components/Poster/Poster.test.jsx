import React from 'react';
import Poster from './Poster';
import Enzyme, { shallow } from 'enzyme';
import { mockMovies } from '../../util/mockData/mockData';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('Poster', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Poster key={mockMovies[0].id}/>)
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

})


