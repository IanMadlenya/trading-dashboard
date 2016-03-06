import './app.scss';

import {provide} from "angular2/core";
import {bootstrap} from "angular2/bootstrap";
import {AppShell} from "./routes/app-shell/app-shell";
import {ROUTER_PROVIDERS, APP_BASE_HREF} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";

bootstrap(AppShell, [provide(APP_BASE_HREF, {useValue: '/'}), ROUTER_PROVIDERS, HTTP_PROVIDERS]);