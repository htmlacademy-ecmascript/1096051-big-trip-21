import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import NewPointModel from './model/new-point-model.js';
import { render, RenderPosition } from './render.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const newPointModel = new NewPointModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointsModel,
  newPointModel
});

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), tripFilters, RenderPosition.BEFOREEND);

boardPresenter.init();
