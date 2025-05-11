import { Container } from "inversify";
import "reflect-metadata";
import { CountGameApiService } from "../services/CountGameApiService";
import { CountGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGamePresenter";
import { ShapesGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGamePresenter";
import { ShapeGameApiService } from "../services/ShapeGameApiService";

const container = new Container();

container.bind(CountGameApiService).toSelf().inSingletonScope();
container.bind(CountGamePresenter).toSelf();
container.bind(ShapeGameApiService).toSelf().inSingletonScope();
container.bind(ShapesGamePresenter).toSelf();

export { container };
