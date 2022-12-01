import renderer from 'react-test-renderer';
import styles from './Alert.module.css';
import { Alert } from './Alert';

jest.mock('./Alert.module.css');

const renderTree = tree => renderer.create(tree);
describe('<Alert>', () => {
  it('should render component', () => {
    expect(renderTree(<Alert 
    />).toJSON()).toMatchSnapshot();
  });
  
});