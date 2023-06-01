import React from "react";
import { Navigate } from "react-router";
import Home from "../pages/Home";
import Mindreading from "../pages/Game/Mindreading";


const routes=[
    {
        path:'/',
        element:<Navigate to = '/home'/>
    },
    {
        path:'home',
        element:<Home/>
    },
    {
        path:'mindreading',
        element:<Mindreading/>
    },
]

export default routes