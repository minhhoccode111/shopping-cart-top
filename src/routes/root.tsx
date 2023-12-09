import { Outlet } from 'react-router-dom';
const Root: React.FC = () => {
  return (
    <>
      <h1>Hello, World</h1>
      <Outlet />
    </>
  );
};
export default Root;
