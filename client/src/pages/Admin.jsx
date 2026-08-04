import AdminProductForm from "../components/AdminProductForm";
import AdminProductList from "../components/AdminProductList";

function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Admin Dashboard
      </h1>

      <AdminProductForm />

      <div className="mt-10">
        <AdminProductList />
      </div>
    </div>
  );
}

export default Admin;