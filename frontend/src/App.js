import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Registerpage from './pages/register/Registerpage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loginpage from './pages/login/Loginpage';
import Footer from './pages/footer/Footer';
import ContactUs from './pages/contactus/ContactUs';
import UpdateExercise from './pages/admin/update_exercise/UpdateExercise';
import ExerciseAdmin from './pages/admin/exercise_admin/ExerciseAdmin';
import MealplanAdmin from './pages/admin/meal_plan_admin/MealplanAdmin';
import UpdateMeal from './pages/admin/update_meal/UpdateMeal';
import ProfilePage from './pages/Profile/Profilepage';
import AdminRoutes from './protected_routes/AdminRoutes';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import UpdateProfile from './pages/Profile/UpdateProfile';
import Navbar from './components/Navbar/Navbar';
import UserNavbar from './components/user_navbar/UserNavbar';
import DefaultNavbar from './components/default_navbar/DefaultNavbar'; 
import UserExercise from './pages/user/exercise_user/ExerciseUser';
import MealUser from './pages/user/meal_user/MealUser';
import TermsConditions from './pages/terms_and_conditions/TermsConditions';
import PrivacyPolicy from './pages/privacy_policy/PrivacyPolicy';
import Leaderboard from './pages/leaderboards/Leaderboard';
import AboutUs from './pages/aboutus/AboutUs';

const Layout = () => {
  const location = useLocation();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('userData'));

  // Define which navbar should be displayed based on user's login and admin status
  const isAdmin = user && user.isAdmin;
  const isLoggedIn = !!user; // Check if the user is logged in

  // Define routes where footer should be hidden
  const hideFooterRoutes = ['/login', '/register'];

  return (
    <>
      {/* Render the appropriate navbar based on the user's status */}
      {isAdmin ? (
        <Navbar />
      ) : isLoggedIn ? (
        <UserNavbar />
      ) : (
        <DefaultNavbar />
      )}

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/get_single_user/:_id' element={<ProfilePage />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/update_profile/:_id' element={<UpdateProfile />} />
        <Route path='/user_exercise' element={<UserExercise />} />
        <Route path='/user_meal' element={<MealUser />} />
        <Route path='/terms_and_conditions' element={<TermsConditions />} />
        <Route path='/privacy_policy' element={<PrivacyPolicy />} />
        <Route path='/leaderboards' element={<Leaderboard />} />
        <Route path='/aboutus' element={<AboutUs />} />

        {/* Exercise Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path='/admin/exercise' element={<ExerciseAdmin />} />
          <Route path='/admin/update_exercise/:id' element={<UpdateExercise />} />

          {/* Meal Plan Admin routes */}
          <Route path='/admin/meal' element={<MealplanAdmin />} />
          <Route path='/admin/update_meal/:id' element={<UpdateMeal />} />
        </Route>
      </Routes>

      {/* Conditionally render the Footer */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Layout />
    </Router>
  );
}

export default App;
