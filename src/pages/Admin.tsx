import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/admin/Layout";
import { DashboardMetrics } from "@/components/admin/DashboardMetrics";

const Admin = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        <DashboardMetrics />
      </div>
    </Layout>
  );
};

export default Admin;