import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

//Seitenimports ergänzen

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/info" element={<Info />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/test" element={<HalloWeltSeite />} />
          <Route path="/home" element={<Home />} />
       
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

//Routen oben anpassen
export default Router;
