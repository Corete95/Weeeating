import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, COLORS } from "./styles";
import { Footer } from "./components";
import { Nav } from "./containers";
import {
  AboutPage,
  AlcoholDetail,
  FeatherDetail,
  KobbubakDetail,
  MainPage,
  MetorDetail,
  PostDetail,
  PostList,
  PostWriting,
  StoreDetail,
  StoreList,
  ThemeList,
  TodayRandom
} from "./pages";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={COLORS}>
          <GlobalStyle />
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/alcohol-detail" component={AlcoholDetail} />
              <Route exact path="/feather-detail" component={FeatherDetail} />
              <Route exact path="/kobbubak-detail" component={KobbubakDetail} />
              <Route exact path="/metor-detail" component={MetorDetail} />
              <Route exact path="/store-detail" component={StoreDetail} />
              <Route exact path="/store-list" component={StoreList} />
              <Route exact path="/theme-list" component={ThemeList} />
              <Route exact path="/today-random" component={TodayRandom} />
              <Route exact path="/post-detail" component={PostDetail} />
              <Route exact path="/post-detail/:id" component={PostDetail} />
              <Route exact path="/post-list" component={PostList} />
              <Route exact path="/post-writing" component={PostWriting} />
            </Switch>
            <Footer />
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
export default Routes;
