
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


import Context from "@/context";
import Layout from "@/layouts";
import '@/global'
import '@/global.less'

import Component0 from "@/pages/admin/index";

import Component1 from "@/pages/center/index";

import Component2 from "@/pages/index";

import Component3 from "@/pages/note/create/index";

const AppRouter: React.FC = () => {
    return (
        <Context>
            <Router>
                <Layout>
                    <Switch>


                      <Route path="/admin" exact={true} component={Component0} />

                      <Route path="/center" exact={true} component={Component1} />

                      <Route path="/" exact={true} component={Component2} />

                      <Route path="/note/create" exact={true} component={Component3} />

                    </Switch>
                </Layout>
            </Router>
        </Context>
    );
}
export default AppRouter;
