import React, { useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Shares from "./pages/Shares/Shares";
import ShareInfo from "./pages/ShareInfo/ShareInfo";
import Stats from "./pages/Stats/Stats";
import Dashboard from "./pages/Dashboard/Dashboard";
import StockChart from "./pages/StockChart/StockChart";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import AuthContext from "./context/AuthContext";
import Currencies from "./pages/Currencies/Currencies";
import Bonds from "./pages/Bonds/Bonds";
import BondInfo from "./pages/BondInfo/BondInfo";
import { BondsProvider } from "./context/BondsContext";
import Assets from "./pages/Assets/Assets";
import CreatePortfolio from "./pages/CreatePortfolio/CreatePortfolio";
import AddAsset from "./pages/AddAsset/AddAsset";
import Loading from "./components/Loading/Loading";
import ManagePortfolios from "./pages/ManagePortfolios/ManagePortfolios";
import Portfolio from "./pages/Portfolio/Portfolio";

const AppRoutes = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/reg" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpForm />} />
                <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInForm />} />
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                    <Route path="shares" element={<Shares />} />
                    <Route path="/share/:figi/info" element={<ShareInfo />} />
                    <Route path="bonds" element={<BondsProvider><Bonds /></BondsProvider>} />
                    <Route path="/bond/:figi/info" element={<BondInfo />} />
                    <Route path="assets" element={<Assets />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="manage-portfolios" element={<ManagePortfolios />} />
                    <Route path="create-portfolio" element={<CreatePortfolio />} />
                    <Route path="portfolio/add-asset" element={<AddAsset />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="/graph" element={<StockChart />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/currencies" element={<Currencies />} />
                    <Route path="*" element={<Dashboard />} />
                </ Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppRoutes;
