import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterPresenter from './presenter/filters-presenter.js';
import FilterModel from './model/filter-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel(destinationsModel.destinations);
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointsModel,
  filterModel,
  destinationsModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: tripFilters,
  filterModel,
  pointsModel
});
const tripInfoPresenter = new TripInfoPresenter({
  pointsModel,
  infoContainer: tripMain,
  filterModel
});
const newPointButtonComponent = new NewPointButtonView({
  onButtonClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMain);

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

