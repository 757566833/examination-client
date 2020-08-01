
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


import Layout from "@/layouts";
import '@/global'
import '@/global.less'

import Component0 from "@/pages/index";

const AppRouter: React.FC = () => {
    return (
        <Layout>
            <Router>
                <Switch>


                    <Route path="/" exact={true} component={Component0} />

                </Switch>
            </Router>
        </Layout>
    );
}
export default AppRouter;
