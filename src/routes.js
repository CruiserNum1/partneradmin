import Index from "@pages/Index";
import Dashboard from "@pages/Dashboard";
import Reports from "@pages/Reports";
import CreateTransaction from "@pages/CreateTransaction";
import Settings from "@pages/Settings";
import Faq from "@pages/Faq";
import Authorization from "@pages/Authorization";

export const ROUTES = [
    {
        path: ``,
        component: Index,
    },
    {
        path: `/`,
        component: Index,
    },
    {
        path: `dashboard`,
        component: Dashboard,
    },
    {
        path: `reports`,
        component: Reports,
    },
    {
        path: `create-transaction`,
        component: CreateTransaction,
    },
    {
        path: `settings`,
        component: Settings,
    },
    {
        path: `faq`,
        component: Faq,
    },
    // auth
    {
        path: `authorization`,
        component: Authorization,
    }
];

export const REDIRECT = [];