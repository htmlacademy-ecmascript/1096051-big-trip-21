import TripSortsView from '../view/trip-sorts-view.js';
import TripListView from '../view/trip-list-view.js';
import BoardView from '../view/board-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
export default class BoardPresenter {
  #boardContainer = null;

  #pointsModel = null;
  #newPointModel = null;
  #destinationsModel = null;

  #boardPoints = null;
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
    this.#destinationsNames = [this.#destinationsModel.names];
    this.#render();
  }

  #render() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      render(new TripListEmptyView, this.#boardComponent.element);
    } else {
      render(new TripSortsView(), this.#boardComponent.element);
      render(this.#tripListComponent, this.#boardComponent.element);
      this.#boardPoints.forEach((point) => this.#renderPoint({ point }));
    }
  }

  #handlePointDataChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointsPresenters.get(updatePoint.id).init(updatePoint, this.#destinationsNames);
  };

  #resetPoints = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.setDefaultStatus());
  }

  #renderPoint({ point }) {
    const pointPresenter = new PointPresenter({
      tripListComponent: this.#tripListComponent,
      onDataChange: this.#handlePointDataChange,
      resetPoints: this.#resetPoints
    });
    pointPresenter.init(point, this.#destinationsModel.names);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  // #clearPoints() {
  //   this.#pointsPresenters.forEach((pesenter) => pesenter.destroy());
  //   this.#pointsPresenters.clear();
  // }
}
