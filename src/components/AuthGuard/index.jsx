import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { populateUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import Loader from "../Loader/Loader";
function AuthGuard({ authenticated, navigateTo }) {
	const { isAuthenticated, tokenExpired, loading } = useSelector(
		(state) => state.userDetails
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated === false && tokenExpired === false) {
			dispatch(populateUserDetails());
		}
	}, [isAuthenticated, tokenExpired]);

	if (loading) return <Loader />;

	if (isAuthenticated === authenticated) return <Outlet />;

	return <Navigate to={navigateTo} />;
}

export default AuthGuard;
