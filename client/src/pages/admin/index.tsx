import { Route, useLocation, useRoute, Switch } from 'wouter';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout';
import PropertiesList from './PropertiesList';
import NewPropertyForm from './NewPropertyForm';
import Login from './Login';

const AdminRoutes = () => {
  const [location] = useLocation();

  // Handle nested routes for the dashboard
  if (location.startsWith('/lotesynavesadmin/dashboard')) {
    return (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout>
            <Switch>
              <Route path="/lotesynavesadmin/dashboard" component={PropertiesList} />
              <Route path="/lotesynavesadmin/dashboard/properties/new" component={NewPropertyForm} />
              <Route>
                <div>Not Found</div>
              </Route>
            </Switch>
          </DashboardLayout>
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  // Handle login and other top-level routes
  if (location === '/lotesynavesadmin') {
    window.location.href = '/lotesynavesadmin/login';
    return null;
  }

  return (
    <AuthProvider>
      <Switch>
        <Route path="/lotesynavesadmin/login" component={Login} />
        <Route>
          <div>Redirecting to login...</div>
          <script dangerouslySetInnerHTML={{
            __html: 'window.location.href = "/lotesynavesadmin/login"',
          }} />
        </Route>
      </Switch>
    </AuthProvider>
  );
};

export default AdminRoutes;
