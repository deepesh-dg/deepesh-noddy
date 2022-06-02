import { Request, Response, NextFunction, Router as ERouter } from "express";
import { safeRoute } from "../lib/RouterErrorHandler/RouterErrorHandler";
import { Logger } from "../lib/Log/Logger";
import { Controller } from "../controllers/Controller";
import _ from "lodash";
import response from "../middlewares/response";

type THandler = (req: Request, res: Response, next: NextFunction) => void;

interface IRouterApiOptions {
    path: string;
    middlewares?: THandler | THandler[];
    handlers: THandler | THandler[];
}

interface IRouterOptions {
    path: string;
    middlewares?: THandler | THandler[];
    apiMiddlewares?: {
        get?: THandler | THandler[];
        post?: THandler | THandler[];
        put?: THandler | THandler[];
        patch?: THandler | THandler[];
        delete?: THandler | THandler[];
    };
    handlers?: THandler | THandler[];
    controller?: new () => Controller;
    router?: Router;
}

const debug: Logger = new Logger({ moduleName: "noddy:routes" });

export class Router {
    private _router: ERouter;

    constructor() {
        this._router = ERouter();
    }

    private linkControllerToRouter(
        ControllerClass: new () => Controller,
        api: "get" | "post" | "put" | "patch" | "delete"
    ): THandler {
        return (req: Request, res: Response, next: NextFunction) => {
            const controllerObj = new ControllerClass();
            controllerObj[api](req, res, next);
        };
    }

    private safeRoutes(handlers: THandler | THandler[]): THandler[] {
        handlers = _.castArray(handlers);
        const safeHandlers: THandler[] = [];

        handlers.forEach((handler) => safeHandlers.push(safeRoute(handler)));

        return safeHandlers;
    }

    private handleApiMethods(config: IRouterApiOptions): {
        path: string;
        handlers: THandler[];
    } {
        const { path, middlewares, handlers } = config;
        const safeHandlers: THandler[] = [];

        if (middlewares) {
            safeHandlers.push(...this.safeRoutes(middlewares));
        }

        safeHandlers.push(...this.safeRoutes(handlers));

        return { path, handlers: safeHandlers };
    }

    public use(config: IRouterOptions): void {
        const {
            path,
            middlewares,
            handlers,
            controller,
            router,
            apiMiddlewares,
        } = config;

        const localApiMiddlewares: {
            get: THandler[];
            post: THandler[];
            put: THandler[];
            patch: THandler[];
            delete: THandler[];
        } = { get: [], post: [], put: [], patch: [], delete: [] };

        if (handlers || middlewares) {
            const safeHandlers: THandler[] = [];

            if (middlewares) safeHandlers.push(...this.safeRoutes(middlewares));

            if (handlers) safeHandlers.push(...this.safeRoutes(handlers));

            this._router.use(path, ...safeHandlers);

            if (handlers) return;
        }

        if (controller) {
            const ControllerClass = controller;

            if (apiMiddlewares) {
                if (apiMiddlewares.get)
                    localApiMiddlewares.get.push(
                        ...this.safeRoutes(apiMiddlewares.get)
                    );

                if (apiMiddlewares.post)
                    localApiMiddlewares.post.push(
                        ...this.safeRoutes(apiMiddlewares.post)
                    );

                if (apiMiddlewares.put)
                    localApiMiddlewares.put.push(
                        ...this.safeRoutes(apiMiddlewares.put)
                    );

                if (apiMiddlewares.patch)
                    localApiMiddlewares.patch.push(
                        ...this.safeRoutes(apiMiddlewares.patch)
                    );

                if (apiMiddlewares.delete)
                    localApiMiddlewares.delete.push(
                        ...this.safeRoutes(apiMiddlewares.delete)
                    );
            }

            this._router.get(
                path,
                ...localApiMiddlewares.get,
                this.linkControllerToRouter(ControllerClass, "get"),
                response
            );
            this._router.post(
                path,
                ...localApiMiddlewares.post,
                this.linkControllerToRouter(ControllerClass, "post"),
                response
            );
            this._router.put(
                path,
                ...localApiMiddlewares.put,
                this.linkControllerToRouter(ControllerClass, "put"),
                response
            );
            this._router.patch(
                path,
                ...localApiMiddlewares.patch,
                this.linkControllerToRouter(ControllerClass, "patch"),
                response
            );
            this._router.delete(
                path,
                ...localApiMiddlewares.delete,
                this.linkControllerToRouter(ControllerClass, "delete"),
                response
            );

            return;
        }

        if (router) this._router.use(path, router.getRoutes());
    }

    public get(config: IRouterApiOptions): Router {
        const { path, handlers } = this.handleApiMethods(config);

        this._router.get(path, ...handlers, response);

        return this;
    }

    public post(config: IRouterApiOptions): Router {
        const { path, handlers } = this.handleApiMethods(config);

        this._router.post(path, ...handlers, response);

        return this;
    }

    public put(config: IRouterApiOptions): Router {
        const { path, handlers } = this.handleApiMethods(config);

        this._router.put(path, ...handlers, response);

        return this;
    }

    public patch(config: IRouterApiOptions): Router {
        const { path, handlers } = this.handleApiMethods(config);

        this._router.patch(path, ...handlers, response);

        return this;
    }

    public delete(config: IRouterApiOptions): Router {
        const { path, handlers } = this.handleApiMethods(config);

        this._router.delete(path, ...handlers, response);

        return this;
    }

    public getRoutes(): ERouter {
        return this._router;
    }
}
