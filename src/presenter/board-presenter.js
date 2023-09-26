import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import BoardView from '../view/board-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove } from '../framework/render.js';
import { sortPoints } from '../utils/sort.js';
import { FilterType, SORTS, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/laoding-view.js';
import { RenderPosition } from '../render.js';
export default class BoardPresenter {
  #boardContainer = null;

  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();
  #emptyListComponent = null;
  #loadingComponent = new LoadingView();

  #currentSortType = SORTS.DAY.title.toLowerCase();
  #newPointPresenter = null;
  #pointsPresenters = new Map();
  #destinations = null;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor({ boardContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationsNames: this.#getDestinationsNames,
      getDestinationDataByName: this.#getDestinationDataByName,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
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
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
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
        this.#destinations = this.#pointsModel.destinations;
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        break;
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

    render(this.#sortComponent, this.#boardComponent.element);
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
      types: this.#pointsModel.types,
    });

    pointPresenter.init(point, this.#getDestinationsNames());
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint({ point }));
  }

  #renderEmptyList() {
    this.#emptyListComponent = new TripListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#emptyListComponent, this.#boardComponent.element);
  }

  #renderList() {
    render(this.#tripListComponent, this.#boardComponent.element);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORTS.DAY.title.toLowerCase();
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
    }

    if (!this.points.length) {
      this.#renderEmptyList();
    } else {
      this.#renderSorts();
      this.#renderList();
      this.#renderPoints();
    }
  }
}
