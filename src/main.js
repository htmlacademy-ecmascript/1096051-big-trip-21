import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import NewPointModel from './model/new-point-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render, RenderPosition } from './render.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel(destinationsModel.destinations);
const newPointModel = new NewPointModel(destinationsModel.destinations);
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointsModel,
  newPointModel,
  destinationsModel,
});

render(new TripInfoView({points: pointsModel.points}), tripMain, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), tripFilters, RenderPosition.BEFOREEND);

boardPresenter.init();
