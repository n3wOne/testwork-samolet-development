import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";

import "../styles/app.css";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import jsonData from "../data/mockData.json";
import { getData } from "../api/api";
import DataTable from "../pages/DataTable";
import DetailedInfo from "../pages/DetailedInfo";
import { DETAILS_PATH, HOME_PATH, ROOT_PATH } from "../Constants";

const history = createBrowserHistory();

export const DataProvider = React.createContext({});

export default function App() {
  const { Header, Content } = Layout;

  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((result) => setData(result));
    // setData(jsonData); //use mock data instead of fetch data
  }, []);

  return (
    <Router history={history}>
      <DataProvider.Provider value={data}>
        <Layout>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0 }}
            >
              <Link to={`${ROOT_PATH}${HOME_PATH}`}>
                <Button>Home</Button>
              </Link>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <Switch>
                <Redirect
                  exact
                  from={ROOT_PATH}
                  to={`${ROOT_PATH}${HOME_PATH}`}
                />
                <Route path={`${ROOT_PATH}${HOME_PATH}`}>
                  <DataTable />
                </Route>
                <Route
                  path={`${ROOT_PATH}${DETAILS_PATH}/:id`}
                  render={(routeProps) => <DetailedInfo {...routeProps} />}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </DataProvider.Provider>
    </Router>
  );
}

App.contextType = DataProvider;
