import React from "react";
import { Navigate } from "react-router";
import Home from "../pages/Home";
import Mindreading from "../pages/Game/Mindreading";
import Guessingsurnames from "../pages/Game/Guessingsurnames";


const routes = [
    {
        path: '/',
        element: <Navigate to='/home' />
    },
    {
        path: 'home',
        element: <Home />
    },
    {
        path: 'mindreading',
        element: <Mindreading />
    },
    {
        path: 'guessingsurnames',
        element: <Guessingsurnames />

    }
]

export default routes