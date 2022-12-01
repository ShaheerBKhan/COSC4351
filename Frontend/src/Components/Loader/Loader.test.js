import renderer from 'react-test-renderer';
import { MutatingDots } from 'react-loader-spinner';
import { Loader } from './Loader';

jest.mock('react-loader-spinner');

const renderTree = tree => renderer.create(tree);
describe('<Loader>', () => {
  it('should render component', () => {
    expect(renderTree(<Loader 
    />).toJSON()).toMatchSnapshot();
  });
  
});