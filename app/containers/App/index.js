/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
// Others
import { isLoggedIn } from 'utils/auth';
import * as Paths from 'constants/routes';
import { ENUM_ROLES } from 'constants/enums';

// Page
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPageV2 from 'containers/LoginPageV2/Loadable';
import RegisterPageV2 from 'containers/RegisterPageV2/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import ArtistDetailPage from 'containers/ArtistDetailPage/Loadable';
import CreateEventPage from 'containers/CreateEventPage/Loadable';
import SearchResultPage from 'containers/SearchResultPage/Loadable';
import Calendar from 'containers/Calendar/Loadable';
import ManagementPage from 'containers/TalentManagementPage/Loadable';
import OrganizerManagementPage from 'containers/OrganizerManagementPage/Loadable';
import PreCheckout from 'containers/PreCheckout/Loadable';
import BookingDetailPage from 'containers/BookingDetailPage/Loadable';
import CreateCustomDealPage from 'containers/CreateCustomDeal/Loadable';
import CreatePackagePage from 'containers/CreatePackagePage/Loadable';
import TalentHomePage from 'containers/TalentHomepage/Loadable';
import EventSearchResultPage from 'containers/EventSearchResultPage/Loadable';
import EventDetailPage from 'containers/EventDetailPage/Loadable';
// Components
import GlobalFonts from 'components/GlobalFonts';
import Banner from 'components/DevelopmentBanner';

// Routes
import PublicRoute from 'components/Router/PublicRoute';
import PrivateRoute from 'components/Router/PrivateRoute';
// Styles
import GlobalStyle from 'global-styles';
import styled from 'styled-components';
import ScrollToTop from 'components/ScrollToTop';
import CreatePositionPage from '../CreatePositionPage/Loadable';

import { requestFirebaseNotificationPermission } from '../../firebaseInit';
const AppWrapper = styled.div`
  margin: 0 auto;
`;

export default function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = isLoggedIn();
  const role = localStorage.getItem('role');
  requestFirebaseNotificationPermission()
    .then(firebaseToken => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
    })
    .catch(err => err);
  return (
    <AppWrapper>
      <GlobalFonts />
      <Helmet
        titleTemplate="%s - Viet entertainment"
        defaultTitle="Viet entertainment"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Viet entertainment" />
      </Helmet>
      <ScrollToTop />
      <Switch>
        <PublicRoute
          exact
          path={Paths.ROUTE_REGISTER}
          // isAuthenticated={isAuthenticated}
        >
          <RegisterPageV2 />
        </PublicRoute>
        <PublicRoute exact path={Paths.ROUTE_FORGOTPASSWORD}>
          <ForgotPasswordPage />
        </PublicRoute>
        <PublicRoute
          exact
          path={Paths.ROUTE_LOGIN}
          // isAuthenticated={isAuthenticated}
        >
          <LoginPageV2 />
        </PublicRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_HOME}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG, ENUM_ROLES.TAL]}
        >
          {role === ENUM_ROLES.ORG ? <HomePage /> : <TalentHomePage />}
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_PRECHECKOUT}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG, ENUM_ROLES.TAL]}
        >
          <PreCheckout />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_CUSTOM_BOOKING}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG]}
        >
          <CreateCustomDealPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_PACKAGE}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.TAL]}
        >
          <CreatePackagePage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_POSITION}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG]}
        >
          <CreatePositionPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_ARTIST_DETAIL}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG]}
        >
          <ArtistDetailPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_EVENT_DETAIL}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.TAL]}
        >
          <EventDetailPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_EVENT}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG]}
        >
          <CreateEventPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_SEARCH_RESULT}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG, ENUM_ROLES.TAL]}
        >
          {role === ENUM_ROLES.ORG ? (
            <SearchResultPage />
          ) : (
            <EventSearchResultPage />
          )}
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_MANAGER}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.TAL, ENUM_ROLES.ORG]}
        >
          {role === ENUM_ROLES.TAL ? (
            <ManagementPage />
          ) : (
            <OrganizerManagementPage />
          )}
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_BOOKING_DETAIL_MANAGER}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG, ENUM_ROLES.TAL]}
        >
          <BookingDetailPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CALENDAR}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ORG, ENUM_ROLES.TAL]}
        >
          <Calendar />
        </PrivateRoute>
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer limit={5} autoClose={1500} />
      {(process.env.REACT_APP_ENV === 'dev' ||
        process.env.REACT_APP_ENV === 'stg') && (
        <Banner>{process.env.REACT_APP_ENV.toUpperCase()}</Banner>
      )}
    </AppWrapper>
  );
}
