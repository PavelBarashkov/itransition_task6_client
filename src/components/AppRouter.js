import { observer } from "mobx-react-lite";
import React from "react";
import {Route, Routes} from "react-router-dom";
import { privateRoutes, publcRoutes } from "../router/routes"

export const AppRouter = observer(() => {

    return (
        <Routes>
            {privateRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            {publcRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
        </Routes>
    )
})