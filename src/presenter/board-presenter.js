import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import BoardView from '../view/board-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import LoadingView from '../view/laoding-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { render, remove } from '../framework/render.js';
import { FilterType, SORTS, UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../render.js';
import { sortPoints } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import ServerFailInfromationView from '../view/server-fail-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {
  #boardContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();
  #emptyListComponent = null;
  #serverFailInformationComponent = null;
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #currentSortType = SORTS.DAY.title.toLowerCase();
  #newPointPresenter = null;
  #pointsPresenters = new Map();
  #destinations = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #handleNewPointDestroy = null;

  constructor({ boardContainer, pointsModel, filterModel, onNewPointDestroy, destinationsModel, offersModel }) {
    this.#boardContainer = boardContainer;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#handleNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  #createNewPointPresenter() {
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
      destinationsNames: this.#getDestinationsNames(),
      getDestinationDataByName: this.#getDestinationDataByName,
      getOffersByType: this.#offersModel.getOffersByType,
      types: this.#offersModel.types,
      renderEmptyList: this.#renderEmptyList
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    return sortPoints([...filteredPoints], this.#currentSortType);
  }

  #getDestinationsNames() {
    const destinationsNames = [];

    this.#destinations.forEach((value) => destinationsNames.push(value.name));
    return destinationsNames;
  }

  #getDestinationDataByName = (name) => {
    let destinationData = null;

    this.#destinations.forEach((value) => {
      if (value.name === name) {
        destinationData = { ...value };
      }
    });

    if (destinationData) {
      destinationData.photos = destinationData.pictures;
      delete destinationData.pictures;
    }

    return destinationData;
  };

  createPoint() {
    this.#currentSortType = SORTS.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    this.#removeEmptyListComponent();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data, this.destinationsNames);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#destinations = this.#destinationsModel.destinations;
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#createNewPointPresenter();
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#emptyListComponent);
        remove(this.#sortComponent);
        this.#clearPointsPresenter();
        this.#renderServerFail();
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSorts() {
    this.#sortComponent = new TripSortsView({
      currentSortType: this.#currentSortType,
      onSortChange: this.#handleSortChange,
    });

    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #resetPoints = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.setDefaultStatus());
  };

  #renderPoint({ point }) {
    const pointPresenter = new PointPresenter({
      tripListComponent: this.#tripListComponent,
      getDestinationDataByName: this.#getDestinationDataByName,
      onDataChange: this.#handleViewAction,
      resetPoints: this.#resetPoints,
      types: this.#offersModel.types,
      getOffersByType: this.#offersModel.getOffersByType
    });

    pointPresenter.init(point, this.#getDestinationsNames());
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint({ point }));
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new TripListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#emptyListComponent, this.#boardComponent.element);
  }

  #renderServerFail() {
    this.#serverFailInformationComponent = new ServerFailInfromationView();
    render(this.#serverFailInformationComponent, this.#boardComponent.element);
  }

  #renderList() {
    render(this.#tripListComponent, this.#boardComponent.element);
  }

  #clearPointsPresenter() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#clearPointsPresenter();

    remove(this.#sortComponent);
    this.#removeEmptyListComponent();

    if (resetSortType) {
      this.#currentSortType = SORTS.DAY.title.toLowerCase();
    }
  }

  #removeEmptyListComponent() {
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  #renderLoading() {
    render(
      this.#loadingComponent,
      this.#boardComponent.element,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderList();
    if (!this.points.length) {
      this.#renderEmptyList();
    } else {
      this.#renderSorts();
      this.#renderPoints();
    }
  }
}
