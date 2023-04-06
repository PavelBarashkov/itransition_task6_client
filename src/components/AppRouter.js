import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom";
import { privateRoutes, publcRoutes } from "../router/routes"
import { Context } from "..";

export const AppRouter = observer(() => {


    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && privateRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            {publcRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
        </Routes>
    )
})