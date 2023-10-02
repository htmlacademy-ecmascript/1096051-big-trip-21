import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import PointsApiService from './api/points-api-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const AUTHORIZATION = 'Basic m0nk3awdawdawdy';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  destinationsModel,
  offersModel
});

const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: tripFilters,
  filterModel,
  pointsModel,
});
const tripInfoPresenter = new TripInfoPresenter({
  pointsModel,
  infoContainer: tripMain,
  filterModel,
});
const newPointButtonComponent = new NewPointButtonView({
  onButtonClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

pointsModel.init()
  .then(() => render(newPointButtonComponent, tripMain))
  .catch((err) => new Error(err.text));
