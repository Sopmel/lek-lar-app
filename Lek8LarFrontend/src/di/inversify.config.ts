import { Container } from "inversify";
import "reflect-metadata";
import { CountGameApiService } from "../services/CountGameApiService";
import { CountGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGamePresenter";
import { ShapesGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGamePresenter";
import { ShapeGameApiService } from "../services/ShapeGameApiService";
import { GameProgressManager } from "../pages/Dashboard/Services/GameProgressManager/GameProgressManager";
import DashboardPresenter from "../pages/Dashboard/DashboardPresenter";

const container = new Container();

container.bind(CountGameApiService).toSelf().inSingletonScope();
container.bind(CountGamePresenter).toSelf();
container.bind(ShapeGameApiService).toSelf().inSingletonScope();
container.bind(ShapesGamePresenter).toSelf();
container.bind(GameProgressManager).toSelf().inSingletonScope();
container.bind(DashboardPresenter).toSelf().inSingletonScope();


export { container };
