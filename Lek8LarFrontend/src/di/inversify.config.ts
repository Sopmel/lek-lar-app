import { Container } from "inversify";
import "reflect-metadata";
import { CountGameApiService } from "../services/CountGameApiService";
import { CountGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGamePresenter";
import { ShapesGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGamePresenter";
import { ShapeGameApiService } from "../services/ShapeGameApiService";
import { PlusGamePresenter } from "../pages/Dashboard/Games/MathGames/LevelOne/PlusGame/PlusGamePresenter";
import { GameProgressManager } from "../pages/Dashboard/Services/GameProgressManager/GameProgressManager";
import DashboardPresenter from "../pages/Dashboard/DashboardPresenter";
import { PlusGameApiService } from "../services/PlusGameApiService";
import { LetterHuntApiService } from "../services/LetterHuntApiService";
import { LetterHuntPresenter } from "../pages/Dashboard/Games/ABCGames/LevelOne/LetterHunt/LetterHuntPresenter";
import { WordMatchApiService } from "../services/WordMatchApiService";
import { WordMatchPresenter } from "../pages/Dashboard/Games/ABCGames/LevelOne/WordMatch/WordMatchPresenter";
import { LetterBubblesApiService } from "../services/LetterBubblesApiService";
import { LetterBubblesPresenter } from "../pages/Dashboard/Games/ABCGames/LevelOne/LetterBubbles/LetterBubblesPresenter";
import { MemoryGamePresenter } from "../pages/Dashboard/Games/MemoryGames/LevelOne/MemoryGame/MemoryGamePresenter";
import { MemoryGameApiService } from "../services/MemoryGameApiService";
import { DashboardApiService } from "../services/DashboardApiService";
import { WhatsMissingApiService } from "../services/WhatsMissingApiService";
import { WhatsMissingPresenter } from "../pages/Dashboard/Games/MemoryGames/LevelOne/WhatsMissing/WhatsMissingPresenter";
import { ColorMixGamePresenter } from "../pages/Dashboard/Games/MemoryGames/LevelOne/ColorMixGame/ColorMixGamePresenter";
import { ColorMixApiService } from "../services/ColorMixApiService";

const container = new Container();

container.bind(CountGameApiService).toSelf().inSingletonScope();
container.bind(CountGamePresenter).toSelf();
container.bind(ShapeGameApiService).toSelf().inSingletonScope();
container.bind(ShapesGamePresenter).toSelf();
container.bind(PlusGameApiService).toSelf().inSingletonScope();
container.bind(PlusGamePresenter).toSelf();
container.bind(LetterHuntApiService).toSelf().inSingletonScope();
container.bind(LetterHuntPresenter).toSelf();
container.bind(WordMatchApiService).toSelf().inSingletonScope();
container.bind(WordMatchPresenter).toSelf();
container.bind(LetterBubblesApiService).toSelf().inSingletonScope();
container.bind(LetterBubblesPresenter).toSelf();
container.bind(MemoryGameApiService).toSelf().inSingletonScope();
container.bind(MemoryGamePresenter).toSelf();
container.bind(ColorMixApiService).toSelf().inSingletonScope();
container.bind(ColorMixGamePresenter).toSelf();
container.bind(WhatsMissingApiService).toSelf().inSingletonScope();
container.bind(WhatsMissingPresenter).toSelf();
container.bind(GameProgressManager).toSelf().inSingletonScope();
container.bind(DashboardPresenter).toSelf()
container.bind(DashboardApiService).toSelf().inSingletonScope();



export { container };
