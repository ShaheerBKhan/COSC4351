import renderer from 'react-test-renderer';
import styles from "./NavBar.module.css";
import NavButtons from '../NavButtons/NavButtons';
import NavBar from "./NavBar";

jest.mock("./NavBar.module.css");
jest.mock('../NavButtons/NavButtons');

const renderTree = tree => renderer.create(tree);
describe('<NavBar>', () => {
  it('should render component', () => {
    expect(renderTree(<NavBar 
    />).toJSON()).toMatchSnapshot();
  });
  
});