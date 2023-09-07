import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import BoardView from '../view/board-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { sortPoints } from '../utils/sort.js';
export default class BoardPresenter {
  #boardContainer = null;

  #pointsModel = null;
  #newPointModel = null;
  #destinationsModel = null;

  #boardPoints = null;
  #copyBoardPoints = null;
  #destinationsNames = null;

  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();

  #pointsPresenters = new Map();

  constructor({boardContainer, pointsModel, newPointModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#newPointModel = newPointModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#copyBoardPoints = sortPoints([...this.#boardPoints]);
    this.#destinationsNames = [...this.#destinationsModel.names];
    this.#render();
  }

  #render() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      this.#renderEmptyList();
    } else {
      this.#renderSorts();
      this.#renderList();
      this.#renderPoints();
    }
  }

  #handlePointDataChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointsPresenters.get(updatePoint.id).init(updatePoint, this.#destinationsNames);
  };

  #handleSortChange = (sortType) => {
    this.#copyBoardPoints = sortPoints(this.#copyBoardPoints, sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #destinationChange = (point, name) => {
    if (this.#destinationsModel.destinations.has(name)) {
      const updateDestination = this.#destinationsModel.destinations.get(name);
      const updatePoint = {...point, destination: updateDestination};

      this.#handlePointDataChange(updatePoint);
    }
  };

  #resetPoints = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.setDefaultStatus());
  };

  #renderPoint({ point }) {
    const pointPresenter = new PointPresenter({
      tripListComponent: this.#tripListComponent,
      onDataChange: this.#handlePointDataChange,
      onDestinationChange: this.#destinationChange,
      resetPoints: this.#resetPoints
    });
    pointPresenter.init(point, this.#destinationsModel.names);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#copyBoardPoints.forEach((point) => this.#renderPoint({ point }));
  }

  #renderSorts() {
    render(new TripSortsView({
      onSortChange: this.#handleSortChange
    }), this.#boardComponent.element);
  }

  #renderEmptyList() {
    render(new TripListEmptyView, this.#boardComponent.element);
  }

  #renderList() {
    render(this.#tripListComponent, this.#boardComponent.element);
  }

  #clearPoints() {
    this.#pointsPresenters.forEach((pesenter) => pesenter.destroy());
    this.#pointsPresenters.clear();
  }
}
