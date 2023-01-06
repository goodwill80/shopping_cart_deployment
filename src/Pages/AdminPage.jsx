import { Outlet, Link } from 'react-router-dom';
import { useGlobalUtility } from '../Store/Utility/Utility.context';

function AdminPage() {
  const { message } = useGlobalUtility();
  return (
    <>
      <div className="px-16 min-h-[75vh] h-auto w-[100vw]">
        <p className="h-12 text-orange-500">{message}</p>
        <div>
          <h1 className="mb-4 text-4xl font-bold">Administrator</h1>
          <nav>
            <Link className="hover:text-orange-400" to="/admin/view">
              View Products List{' '}
            </Link>{' '}
            |{'  '}
            <Link className="hover:text-orange-400" to="/admin/view/add">
              Add Product
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminPage;
