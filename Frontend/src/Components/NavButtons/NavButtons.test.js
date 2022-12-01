import renderer from 'react-test-renderer';
import { useNavigate } from 'react-router-dom';
import { logoutPost } from '../../Controller/Controller';
import styles from './NavButtons.module.css';
import NavButtons from './NavButtons';

jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');
jest.mock('./NavButtons.module.css');

const renderTree = tree => renderer.create(tree);
describe('<NavButtons>', () => {
  it('should render component', () => {
    expect(renderTree(<NavButtons 
    />).toJSON()).toMatchSnapshot();
  });
  
});