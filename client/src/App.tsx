import {
  AuthBindings,
  Authenticated,
  // GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  DashboardSharp,
} from "@mui/icons-material";

//Pages
import Home from "pages/Home";
import AllProperties from "pages/AllProperties";
import PropertyDetails from "pages/PropertyDetails";
import CreateProperty from "pages/CreateProperty";
import EditProperty from "pages/EditProperty";
import Agent from "pages/Agent";
import AgentProfile from "pages/AgentProfile";
import MyProfile from "pages/MyProfile";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      console.log("test 1 is good here");

      //Saving the user to MongoDB ...
      if (profileObj) {
        const response = await fetch(
          "https://refine-dashboard-eiy7.onrender.com/api/v1/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      if (profileObj) {
        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: { WebkitFontSmoothing: "auto" },
            }}
          />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(
                "https://refine-dashboard-eiy7.onrender.com/api/v1"
              )}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  list: Home,
                  icon: <DashboardSharp />,
                },
                {
                  name: "properties",
                  list: AllProperties,
                  show: PropertyDetails,
                  create: CreateProperty,
                  edit: EditProperty,
                  icon: <VillaOutlined />,
                },
                {
                  name: "agents",
                  list: Agent,
                  show: AgentProfile,
                  icon: <PeopleAltOutlined />,
                },
                {
                  name: "reviews",
                  list: Home,
                  icon: <StarOutlineRounded />,
                },
                {
                  name: "messages",
                  list: Home,
                  icon: <ChatBubbleOutline />,
                },
                {
                  name: "my-profile",
                  options: {
                    label: "My Profile",
                  },
                  list: MyProfile,
                  icon: <AccountCircleOutlined />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/dashboard">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/properties">
                    <Route index element={<AllProperties />} />
                    <Route path="create" element={<CreateProperty />} />
                    <Route path="edit/:id" element={<EditProperty />} />
                    <Route path="show/:id" element={<PropertyDetails />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<Agent />} />
                    <Route path="show/:id" element={<AgentProfile />} />
                  </Route>
                  <Route path="/reviews">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/messages">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/my-profile">
                    <Route index element={<MyProfile />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
